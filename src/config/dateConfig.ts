/**
 * ============================================================================
 * LOVE PROJECT - ROMANTIC DATE INVITATION CONFIGURATION
 * Created by Nikhil Chauhan
 * ============================================================================
 * 
 * Edit the values below to personalize this date invitation for your special someone!
 * 
 * You can also change these values live in the app using the floating Settings icon.
 */

export interface DateAppConfig {
  /** The name of your girlfriend / special someone */
  recipientName: string;

  /** Your name (used in summary or signatures) */
  senderName: string;

  /** 
   * WhatsApp number for sending the final date confirmation message.
   * Include country code (e.g. +919876543210 or +1234567890).
   * Default is a public demonstration number.
   */
  whatsAppNumber: string;

  /** 
   * Default Special Date in 'YYYY-MM-DD' format (optional).
   * If left null, the app prompts for date selection.
   */
  specialDate: string | null;

  /** Optional background music audio stream URL */
  audioUrl: string;

  /** Custom message headers & texts */
  messages: {
    questionTitle: string;
    questionSubtitle: string;
    celebrationTitle: string;
    celebrationSubtitle: string;
    quoteTitle: string;
    quoteSubtitle: string;
    confirmedTitle: string;
    confirmedSubtitle: string;
  };
}

export const DEFAULT_CONFIG: DateAppConfig = {
  recipientName: "Your Special Someone",
  senderName: "Me",
  // Public demonstration WhatsApp number (Replace with your real number):
  whatsAppNumber: "+919876543210",
  specialDate: null,
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  messages: {
    questionTitle: "Will you meet me? ❤️",
    questionSubtitle: "A tiny question for you...",
    celebrationTitle: "Yayyyy... 🥹❤️",
    celebrationSubtitle: "I was secretly hoping you'd say yes.",
    quoteTitle: "Esa hi kya\nmeri jaan? ❤️",
    quoteSubtitle: "One little thing...",
    confirmedTitle: "It's a date! ❤️",
    confirmedSubtitle: "Now I have something to look forward to. 🥹"
  }
};

const STORAGE_KEY = 'love_project_custom_config';

/**
 * Loads current configuration, prioritizing user custom settings from localStorage
 */
export function getAppConfig(): DateAppConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("Could not load config from localStorage", e);
  }
  return DEFAULT_CONFIG;
}

/**
 * Saves modified configuration to localStorage
 */
export function saveAppConfig(newConfig: Partial<DateAppConfig>): DateAppConfig {
  const current = getAppConfig();
  const updated = { ...current, ...newConfig };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Could not save config to localStorage", e);
  }
  return updated;
}

/**
 * Resets configuration back to defaults
 */
export function resetAppConfig(): DateAppConfig {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Could not reset config", e);
  }
  return DEFAULT_CONFIG;
}
