'use client'
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import UserProfile from '@/components/icon'
import Sidebar from '@/components/Sidebar'
import menu from '@/assets/Menu Button.png'
import Ellipsis from '@/assets/Ellipse.png'
import Ads from '@/components/ads'
import Token from '@/components/token'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'

interface MerchantStats {
  totalRevenue: string;
  monthlyRevenue: string;
  totalTransactions: string;
  activeCustomers: string;
  avgOrderValue: string;
  successRate: string;
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
}

type TimeframePeriod = '24h' | '7d' | '30d' | '1y';

interface RevenueChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointHoverBackgroundColor: string;
    pointHoverBorderColor: string;
  }[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Merchant() {
  const [timeframe, setTimeframe] = useState<TimeframePeriod>('7d')
  const [revenueData, setRevenueData] = useState<RevenueChartData>({
    labels: [],
    datasets: []
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const walletAddress: string = "0x1234567890abcdef1234567890abcdef12345678"

  useEffect(() => {
    const reloadKey = 'merchantReloaded'
    
    if (!window.name.includes(reloadKey)) {
      window.name += reloadKey
      window.location.reload()
    } else {
      console.log('Merchant page - Already reloaded, skipping')
    }
  }, [])
  const stats: MerchantStats = {
    totalRevenue: '2,847.92 APT',
    monthlyRevenue: '$3,890.25',
    totalTransactions: '1,247',
    activeCustomers: '342',
    avgOrderValue: '12.34 APT',
    successRate: '98.5%'
  }
  useEffect(() => {
    const generateData = () => {
      let labels, data
      
      if (timeframe === '24h') {
        labels = Array.from({ length: 24 }, (_, i) => `${i}:00`)
        data = Array.from({ length: 24 }, () => Math.floor(Math.random() * 500) + 100)
      } else if (timeframe === '7d') {
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 2000) + 500)
      } else if (timeframe === '30d') {
        labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
        data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 1500) + 200)
      } else {
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5000) + 1000)
      }

      setRevenueData({
        labels,
        datasets: [
          {
            label: 'Revenue (APT)',
            data,
            borderColor: 'rgb(139, 92, 246)',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            tension: 0.4,
            pointBackgroundColor: 'rgb(139, 92, 246)',
            pointBorderColor: 'rgb(139, 92, 246)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(139, 92, 246)',
          }
        ]
      })
    }

    generateData()
  }, [timeframe])
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(139, 92, 246, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y.toLocaleString()} APT`
          }
        }
      }
    },    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 12
          },
          callback: function(value: any) {
            return value.toLocaleString() + ' APT'
          }
        }
      }
    }
  }

  const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, trend }) => (
    <article className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
      <header className="mb-2">
        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide">{title}</h3>
      </header>
      <div className="space-y-1">
        <p className="text-lg sm:text-xl font-bold text-white leading-tight">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-400">{subtitle}</p>
        )}
        {trend && (
          <div className="flex items-center gap-1">
            <span className={`text-xs px-2 py-1 rounded-full ${
              trend.startsWith('+') 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            }`}>
              {trend}
            </span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        )}
      </div>
    </article>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-5">       <section className="absolute top-[-6rem]">
              <img src={Ellipsis.src} alt="Background decoration" className="w-4xl h-4xl object-contain" />
            </section>            <header className="relative flex items-center justify-between mb-8 pt-4">
              <div onClick={() => setIsSidebarOpen(true)} className="cursor-pointer">
                <UserProfile profileImage={menu.src} />
              </div>
            </header>
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className='flex-col items-center'>
            <h1 className='font-bold text-3xl'>Hi,
                <span className='ml-2 text-green-400'>
                 John Doe
                </span>
            </h1>
            <p>Here are your sales for today with Aptos!</p>
        </div>

        <section className="relative z-10 flex-col items-center gap-2 mb-4">
                <p>Balance</p>
                <h1 className="text-4xl text-green-400">
                    $123,456
                </h1>
              </section>

        {/* Stats Grid - Mobile First */}
        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">Business Statistics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <StatCard 
              title="Total Revenue" 
              value={stats.totalRevenue} 
              subtitle="All time APT earnings"
              trend="+12.5%"
            />
            <StatCard 
              title="Monthly Revenue" 
              value={stats.monthlyRevenue} 
              subtitle="This month's USD"
              trend="+8.2%"
            />
            <StatCard 
              title="Transactions" 
              value={stats.totalTransactions} 
              subtitle="Completed payments"
              trend="+15.7%"
            />
            <StatCard 
              title="Customers" 
              value={stats.activeCustomers} 
              subtitle="Active users"
              trend="+6.3%"
            />
            <StatCard 
              title="Avg Order" 
              value={stats.avgOrderValue} 
              subtitle="Per transaction"
              trend="+3.1%"
            />
            <StatCard 
              title="Success Rate" 
              value={stats.successRate} 
              subtitle="Payment success"
              trend="+0.2%"
            />
          </div>
        </section>

        {/* Revenue Chart - Mobile Optimized */}
        <section aria-labelledby="revenue-heading" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-gray-700/50">
          <header className="flex flex-col gap-3 mb-4">
            <div>
              <h2 id="revenue-heading" className="text-lg sm:text-xl font-bold text-white">APT Revenue Analytics</h2>
              <p className="text-gray-400 text-xs sm:text-sm">Track your Aptos earnings over time</p>
            </div>
            
            {/* Timeframe Buttons - Mobile Stack */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Select timeframe">            {(['24h', '7d', '30d', '1y'] as TimeframePeriod[]).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    timeframe === period
                      ? 'bg-green-700 text-white shadow-lg shadow-green-400/25'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  }`}
                  aria-pressed={timeframe === period}
                >
                  {period}
                </button>
              ))}
            </div>
          </header>
          
          {/* Chart Container - Mobile Height */}
          <div className="h-64 sm:h-80" role="img" aria-label="APT Revenue chart">
            {revenueData.labels && (
              <Line data={revenueData} options={chartOptions} />
            )}
          </div>
        </section>
      </div>

      <div className='mt-10 mb-8'>
          <Ads />
      </div>
    <Token />
      {/* Sidebar */}
    <Sidebar
      isOpen={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      walletAddress={walletAddress}
      disconnectWallet={() => console.log('Disconnecting wallet...')}
      menuIcon={menu}
      isMerchant={true} // Important: Set to true for merchant mode
    />
    </main>
  )
}