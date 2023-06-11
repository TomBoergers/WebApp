export interface MessageIo {
  messageID: number; // Eindeutige ID für die Nachricht
  chatID: number; // ID des Chats, zu dem die Nachricht gehört
  sender: string; // Absender der Nachricht
  timestamp: string; // Zeitstempel der Nachricht
  content: string; // Inhalt der Nachricht
}
