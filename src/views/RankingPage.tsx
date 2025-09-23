import { useNavigate } from "react-router-dom";
import { useFetchUsersQuery } from "../shared/store";
import { IUser } from "../shared/store/slices/UserSlice";
import FirstTitle from "../shared/components/FirstTitle";
import MainTitle from "../shared/components/MainTitle";
import { FaTrophy, FaMedal, FaAward, FaCrown, FaFire, FaStar, FaCalendarWeek, FaCalendarAlt, FaBolt } from "react-icons/fa";
import { useState } from "react";

// Extend Date prototype for getWeek method
declare global {
  interface Date {
    getWeek(): number;
  }
}

Date.prototype.getWeek = function() {
  const onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
};

const RankingPage = () => {
  const response = useFetchUsersQuery("");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overall' | 'weekly' | 'monthly' | 'streak'>('overall');

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <FaCrown className="text-yellow-500 text-2xl" />;
      case 1: return <FaTrophy className="text-gray-400 text-xl" />;
      case 2: return <FaMedal className="text-orange-400 text-xl" />;
      default: return <span className="text-lg font-bold text-gray-600">#{index + 1}</span>;
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0: return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 1: return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 2: return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getSortedData = () => {
    if (!response.isSuccess || !response.data) return [];
    
    // Create a copy of the array to avoid read-only error
    const data = [...response.data];
    
    switch (activeTab) {
      case 'overall':
        return data.sort((a: IUser, b: IUser) => b.experience - a.experience);
      case 'weekly':
        // Symulacja tygodniowego XP (w rzeczywistości potrzebowałbyś osobnego API)
        return data.sort((a: IUser, b: IUser) => {
          const weeklyA = Math.floor(a.experience * 0.1) + Math.floor(Math.random() * 100);
          const weeklyB = Math.floor(b.experience * 0.1) + Math.floor(Math.random() * 100);
          return weeklyB - weeklyA;
        });
      case 'monthly':
        // Symulacja miesięcznego XP
        return data.sort((a: IUser, b: IUser) => {
          const monthlyA = Math.floor(a.experience * 0.3) + Math.floor(Math.random() * 200);
          const monthlyB = Math.floor(b.experience * 0.3) + Math.floor(Math.random() * 200);
          return monthlyB - monthlyA;
        });
      case 'streak':
        // Sortowanie według streak
        return data.sort((a: IUser, b: IUser) => b.streak - a.streak);
      default:
        return data.sort((a: IUser, b: IUser) => b.experience - a.experience);
    }
  };

  const getTabConfig = () => {
    switch (activeTab) {
      case 'overall':
        return {
          title: 'Ogólny Ranking',
          subtitle: 'Wszystkie punkty doświadczenia',
          getValue: (user: IUser) => user.experience,
          getLabel: (user: IUser) => `${user.experience} XP`,
          getSubLabel: (user: IUser) => `Poziom ${user.level}`
        };
      case 'weekly':
        return {
          title: 'Ranking Tygodniowy',
          subtitle: 'Punkty z tego tygodnia',
          getValue: (user: IUser) => Math.floor(user.experience * 0.1) + Math.floor(Math.random() * 100),
          getLabel: (user: IUser) => `${Math.floor(user.experience * 0.1) + Math.floor(Math.random() * 100)} XP`,
          getSubLabel: (user: IUser) => `Tydzień ${new Date().getWeek()}`
        };
      case 'monthly':
        return {
          title: 'Ranking Miesięczny',
          subtitle: 'Punkty z tego miesiąca',
          getValue: (user: IUser) => Math.floor(user.experience * 0.3) + Math.floor(Math.random() * 200),
          getLabel: (user: IUser) => `${Math.floor(user.experience * 0.3) + Math.floor(Math.random() * 200)} XP`,
          getSubLabel: (user: IUser) => `Miesiąc ${new Date().getMonth() + 1}`
        };
      case 'streak':
        return {
          title: 'Ranking Streak',
          subtitle: 'Najdłuższe serie',
          getValue: (user: IUser) => user.streak,
          getLabel: (user: IUser) => `${user.streak} dni`,
          getSubLabel: (user: IUser) => `Serie: ${user.streak}`
        };
    }
  };

  let content = (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
      <span className="ml-3 text-gray-600">Ładowanie rankingu...</span>
    </div>
  );

  if (response.isLoading) {
    content = (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
        <span className="ml-3 text-gray-600">Ładowanie rankingu...</span>
      </div>
    );
  } else if (response.isError) {
    content = (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-2">❌ Wystąpił błąd</div>
        <div className="text-gray-600">Przekierowanie za 3 sekundy...</div>
      </div>
    );
    setTimeout(() => navigate("/app/folders"), 3000);
  } else if (response.isSuccess) {
    const sortedData = getSortedData();
    const tabConfig = getTabConfig();

    content = (
      <div className="space-y-3">
        {sortedData.map((user: IUser, index: number) => (
          <div
            key={user.userName}
            className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
              index < 3 
                ? "bg-gradient-to-r from-white to-gray-50 border-2 shadow-lg" 
                : "bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md"
            }`}
          >
            {/* Rank and User Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getRankBadge(index)}`}>
                {getRankIcon(index)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-800 truncate">
                    {user.userName}
                  </h3>
                  {index < 3 && (
                    <div className="flex items-center gap-1">
                      {index === 0 && <FaFire className="text-red-500 text-sm" />}
                      {index === 1 && <FaStar className="text-blue-500 text-sm" />}
                      {index === 2 && <FaAward className="text-orange-500 text-sm" />}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {tabConfig.getSubLabel(user)}
                </div>
              </div>
            </div>

            {/* Value Display */}
            <div className="hidden sm:flex flex-col items-end gap-2 min-w-0">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-800">{tabConfig.getLabel(user)}</div>
                <div className="text-xs text-gray-500">{tabConfig.getSubLabel(user)}</div>
              </div>
              {activeTab !== 'streak' && (
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-secondary to-secondarylight rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (tabConfig.getValue(user) % 1000) / 10)}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Top 3 special effects */}
            {index < 3 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex w-full min-h-full bg-gray-50">
      <div className="flex flex-col w-full max-w-4xl mx-auto px-6 py-6 lg:py-10">
        
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-2xl px-5 sm:px-6 py-4 mb-8">
          <div>
            <MainTitle>{getTabConfig().title}</MainTitle>
            <p className="text-sm text-gray-600">{getTabConfig().subtitle}</p>
          </div>
        </div>

        {/* Ranking Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'overall', label: 'Ogólny', icon: <FaTrophy /> },
            { key: 'weekly', label: 'Tygodniowy', icon: <FaCalendarWeek /> },
            { key: 'monthly', label: 'Miesięczny', icon: <FaCalendarAlt /> },
            { key: 'streak', label: 'Streak', icon: <FaBolt /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-white/80 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-2xl p-6">
          {content}
        </div>

        {/* Additional Stats Section */}
        {response.isSuccess && response.data.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{response.data.length}</div>
              <div className="text-sm text-gray-600">Aktywnych graczy</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-secondary">
                {activeTab === 'streak' 
                  ? Math.max(...response.data.map((u: IUser) => u.streak))
                  : Math.max(...response.data.map((u: IUser) => u.experience))
                }
              </div>
              <div className="text-sm text-gray-600">
                {activeTab === 'streak' ? 'Najdłuższy streak' : 'Najwyższy XP'}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-secondary">
                {activeTab === 'streak'
                  ? Math.round(response.data.reduce((sum: number, u: IUser) => sum + u.streak, 0) / response.data.length)
                  : Math.round(response.data.reduce((sum: number, u: IUser) => sum + u.experience, 0) / response.data.length)
                }
              </div>
              <div className="text-sm text-gray-600">
                {activeTab === 'streak' ? 'Średni streak' : 'Średni XP'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingPage;
