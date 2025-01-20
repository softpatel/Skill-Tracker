import React, { useState } from 'react';
import Button from '../common/Button';

const ProgressEntryList = ({ entries = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortedEntries = entries && entries.length ? [...entries].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  ) : [];

  if (!entries.length) {
    return null;
  }

  return (
    <div className="bg-indigo-800/50 shadow-lg rounded-lg border border-indigo-700/50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">Progress History</h3>
            <p className="text-indigo-300 text-sm">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'} recorded
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Hide Entries' : 'View Entries'}
          </Button>
        </div>

        {isOpen && (
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-indigo-700/50">
                    <th className="pb-2 text-indigo-300 font-medium">Date</th>
                    <th className="pb-2 text-indigo-300 font-medium">Duration</th>
                    <th className="pb-2 text-indigo-300 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-700/50">
                  {sortedEntries.map((entry) => (
                    <tr key={entry._id} className="text-indigo-200">
                      <td className="py-3">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        {entry.duration} {entry.duration === 1 ? 'hour' : 'hours'}
                      </td>
                      <td className="py-3 max-w-md">
                        {entry.notes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-indigo-900/30 rounded-lg border border-indigo-600/50">
              <div className="flex justify-between text-sm text-indigo-300">
                <span>
                  Total Time: {entries.reduce((sum, entry) => sum + entry.duration, 0)} hours
                </span>
                <span>
                  First Entry: {new Date(entries[entries.length - 1].date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressEntryList;