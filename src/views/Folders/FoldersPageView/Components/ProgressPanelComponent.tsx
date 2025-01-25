function ProgressPanel(percentage:{ percentage: number; }){
    
    const progressPanelConfig = {
        textColor: {
            green: 'text-green-600',
            red: 'text-red-600',
            orange: 'text-orange-500',
        }
    }

    let progressTextColor = progressPanelConfig.textColor.red
    if (percentage.percentage > 40 && percentage.percentage < 70) {
        progressTextColor = progressPanelConfig.textColor.orange
    } else if (percentage.percentage >= 70) {
        progressTextColor = progressPanelConfig.textColor.green
    }   

    return(
            <div className="flex items-center max-lg:hidden">
              <div className="text-fifth font-inter font-medium text-base">
                Progress:
              </div>
              <div className={`${progressTextColor} font-inter font-medium text-base`}>
                {percentage.percentage}%
              </div>
            </div>
    )
}

export default ProgressPanel;