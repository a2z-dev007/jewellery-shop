import { Store } from '../../stores/models/Store';
import { Appointment } from '../models/Appointment';
import { ApiError } from '../../../shared/utils/ApiError';

export async function generateAvailableSlots(
  storeId: string,
  dateStr: string, // format YYYY-MM-DD
  serviceDuration: number // duration in minutes
): Promise<string[]> {
  const store = await Store.findById(storeId).exec();
  if (!store) {
    throw ApiError.notFound('Store not found');
  }

  // Check if date is a holiday
  if (store.settings.holidays?.includes(dateStr)) {
    return [];
  }

  // Get day of week
  const dateObj = new Date(dateStr);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[dateObj.getDay()];

  // Get working hours for the day
  const workingHours = store.settings.workingHours as any;
  const daySchedule = workingHours ? workingHours.get ? workingHours.get(dayName) : workingHours[dayName] : null;
  if (!daySchedule || !daySchedule.active) {
    return []; // Closed today
  }

  const { open, close } = daySchedule; // e.g. "09:00", "17:00"
  const [openHour, openMin] = open.split(':').map(Number);
  const [closeHour, closeMin] = close.split(':').map(Number);

  // Set up day limits
  const startOfDay = new Date(dateStr);
  startOfDay.setHours(openHour, openMin, 0, 0);

  const endOfDay = new Date(dateStr);
  endOfDay.setHours(closeHour, closeMin, 0, 0);

  // Fetch existing appointments for the day
  const dayStart = new Date(dateStr);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dateStr);
  dayEnd.setHours(23, 59, 59, 999);

  const existingAppts = await Appointment.find({
    startTime: { $gte: dayStart, $lte: dayEnd },
    status: { $in: ['PENDING', 'CONFIRMED'] },
  }).exec();

  const slots: string[] = [];
  let currentSlotStart = new Date(startOfDay);

  while (currentSlotStart.getTime() + serviceDuration * 60000 <= endOfDay.getTime()) {
    const currentSlotEnd = new Date(currentSlotStart.getTime() + serviceDuration * 60000);

    // Check overlap with existing appointments
    const isOverlapping = existingAppts.some((appt) => {
      const apptStart = appt.startTime.getTime();
      const apptEnd = appt.endTime.getTime();
      const slotStart = currentSlotStart.getTime();
      const slotEnd = currentSlotEnd.getTime();

      // Check overlap logic: (StartA < EndB) and (EndA > StartB)
      return slotStart < apptEnd && slotEnd > apptStart;
    });

    if (!isOverlapping) {
      const hours = String(currentSlotStart.getHours()).padStart(2, '0');
      const minutes = String(currentSlotStart.getMinutes()).padStart(2, '0');
      slots.push(`${hours}:${minutes}`);
    }

    // Advance by slot duration (or interval e.g. 30 mins, let's advance by duration)
    currentSlotStart = new Date(currentSlotStart.getTime() + serviceDuration * 60000);
  }

  return slots;
}
