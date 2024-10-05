function ProgressPanel(percentage:number){
    
    const progressPanelConfig = {
        textColor: {
            green: 'text-green-600',
            red: 'text-red-600',
            orange: 'text-orange-500',
        }
    }

    let progressTextColor = progressPanelConfig.textColor.red
    if (percentage > 40 && percentage < 70) {
        progressTextColor = progressPanelConfig.textColor.orange
    } else if (percentage >= 70) {
        progressTextColor = progressPanelConfig.textColor.red
    }   

    return(
            <div className="flex items-center max-lg:hidden">
              <div className="text-fifth font-inter font-medium text-base">
                Progress:
              </div>
              <div className={`${progressTextColor} font-inter font-medium text-base`}>
                {percentage}%
              </div>
            </div>
    )
}

export default ProgressPanel;