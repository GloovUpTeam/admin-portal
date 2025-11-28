
export const getReminders = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem('gloov_domain_reminders') || '{}');
  } catch {
    return {};
  }
};

export const saveReminders = (reminders: Record<string, string>) => {
  try {
    localStorage.setItem('gloov_domain_reminders', JSON.stringify(reminders));
  } catch (e) {
    console.error('Failed to save reminders', e);
  }
};

export const saveTicketsLocal = (tickets: any[]) => {
  try {
    localStorage.setItem('gloov_tickets', JSON.stringify(tickets));
  } catch (e) {
    console.error('Failed to save tickets', e);
  }
};

export const loadTicketsLocal = (): any[] | null => {
  try {
    const saved = localStorage.getItem('gloov_tickets');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};
