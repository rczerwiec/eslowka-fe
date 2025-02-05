import React from "react";

function ProgressPanel({ percentage, wordAmount }: { percentage: number, wordAmount: number}) {
  // Konfiguracja kolorów paska postępu
  const progressPanelConfig = {
    textColor: {
      green: "text-green-600",
      red: "text-red-600",
      orange: "text-orange-500",
    },
    bgColor: {
      green: "bg-green-500",
      red: "bg-red-500",
      orange: "bg-orange-400",
    },
  };

  // Określenie koloru tekstu i paska na podstawie wartości procentowej
  let progressTextColor = progressPanelConfig.textColor.red;
  let progressBgColor = progressPanelConfig.bgColor.red;

  if (percentage > 40 && percentage < 70) {
    progressTextColor = progressPanelConfig.textColor.orange;
    progressBgColor = progressPanelConfig.bgColor.orange;
  } else if (percentage >= 70) {
    progressTextColor = progressPanelConfig.textColor.green;
    progressBgColor = progressPanelConfig.bgColor.green;
  }

  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-white  rounded-lg">
      {/* Nagłówek */}
      <div className="flex justify-between items-center">
        <span className="text-fifth font-semibold text-lg">Postęp:</span>
        <span className={`font-semibold text-lg ${progressTextColor}`}>
          {percentage}%
        </span>
      </div>

      {/* Pasek postępu */}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${progressBgColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-center items-center mt-2 text-sm text-gray-600">Ilość Słówek: <span className="font-semibold">{wordAmount}</span></div>
    </div>
  );
}

export default ProgressPanel;
