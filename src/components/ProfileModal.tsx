import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  calibrationMode: string;
  onToggleCalibration: () => void;
  onResetSession: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  calibrationMode,
  onToggleCalibration,
  onResetSession
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#eaedff] flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#00236f] text-white flex items-center justify-center font-bold font-['JetBrains_Mono'] text-xs">
              AO
            </div>
            <div>
              <h3 className="font-['Hanken_Grotesk'] text-sm font-bold text-[#131b2e]">
                Auditor Session
              </h3>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#444651]">
                Session ID: #SES-9821
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#f2f3ff] text-[#444651] hover:text-[#131b2e] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5 font-['JetBrains_Mono'] text-xs">
          <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#eaedff] flex justify-between items-center">
            <span className="text-[#444651]">Engine Status:</span>
            <span className="font-bold text-[#00236f]">v2.4 Research</span>
          </div>

          <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#eaedff] flex justify-between items-center">
            <span className="text-[#444651]">Calibration State:</span>
            <button
              onClick={onToggleCalibration}
              className="px-2 py-0.5 rounded bg-[#00312c] text-[#89f5e7] font-bold text-[11px] hover:opacity-90 flex items-center gap-1"
            >
              <span>{calibrationMode}</span>
              <span className="material-symbols-outlined text-[12px]">sync</span>
            </button>
          </div>

          <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#eaedff] flex justify-between items-center">
            <span className="text-[#444651]">Privacy Mode:</span>
            <span className="font-bold text-[#004942]">Zero-Persistence Active</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#eaedff] flex flex-col gap-2">
          <button
            onClick={() => {
              onResetSession();
              onClose();
            }}
            className="w-full py-2 rounded-lg bg-[#ffdad6] text-[#ba1a1a] font-['JetBrains_Mono'] text-xs font-semibold hover:bg-[#ba1a1a] hover:text-white transition"
          >
            Reset Demo State to Amara Okoye
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-[#f2f3ff] text-[#444651] font-['JetBrains_Mono'] text-xs font-semibold hover:bg-[#eaedff] transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
