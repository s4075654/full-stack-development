import { useState, useEffect } from 'react';

interface ReminderModalProps {
  eventTime: Date;
  show: boolean;
  onClose: () => void;
  onSubmit: (message: string, minutesBefore: number) => Promise<void>;
}

export default function ReminderModal({ eventTime, show, onClose, onSubmit }: ReminderModalProps) {
  const [message, setMessage] = useState('');
  const [minutesBefore, setMinutesBefore] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      setShowSuccess(false); 
      return () => {
        document.body.style.overflow = '';
      }
    }
  }, [show]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit(message, minutesBefore);
      setShowSuccess(true);
      setMessage('');
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
      }, 900);
    } catch (error) {
      console.error('Failed to set reminder:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        {showSuccess ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-2xl mb-2">✓</div>
            <p className="text-lg font-medium text-gray-800">Reminder set successfully!</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4">Set Event Reminder</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Event Time: {eventTime.toLocaleString()}
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows={3}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Remind Before</label>
              <select
                value={minutesBefore}
                onChange={(e) => setMinutesBefore(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
              >
                {/* The first three options can be used for testing */}
                <option value={1}>1 minute</option>
                <option value={2}>2 minutes</option>
                <option value={5}>5 minutes</option>
                {/* Normal options */}
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={1440}>1 day</option>
                <option value={10080}>1 week</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Setting...' : 'Set Reminder'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}