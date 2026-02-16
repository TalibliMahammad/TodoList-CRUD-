import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { MdCheckCircle, MdPending, MdTrendingUp, MdCalendarToday } from 'react-icons/md'

const Statistics = () => {
  const items = useSelector((state) => state.counter.items)

  const stats = useMemo(() => {
    const total = items?.length ?? 0
    const completed = (items ?? []).filter((t) => t.isChecked && !t.archived).length
    const active = total - completed - ((items ?? []).filter((t) => t.archived).length)
    const archived = (items ?? []).filter((t) => t.archived).length
    
    const priorityStats = {
      High: (items ?? []).filter((t) => t.priority === 'High' && !t.isChecked && !t.archived).length,
      Medium: (items ?? []).filter((t) => t.priority === 'Medium' && !t.isChecked && !t.archived).length,
      Low: (items ?? []).filter((t) => t.priority === 'Low' && !t.isChecked && !t.archived).length,
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dueToday = (items ?? []).filter((t) => {
      if (!t.deadline || t.isChecked || t.archived) return false
      const deadline = new Date(t.deadline)
      deadline.setHours(0, 0, 0, 0)
      return deadline.getTime() === today.getTime()
    }).length

    const overdue = (items ?? []).filter((t) => {
      if (!t.deadline || t.isChecked || t.archived) return false
      const deadline = new Date(t.deadline)
      deadline.setHours(0, 0, 0, 0)
      return deadline < today
    }).length

    const completionRate = total > 0 ? Math.round((completed / (total - archived)) * 100) : 0

    return {
      total,
      completed,
      active,
      archived,
      priorityStats,
      dueToday,
      overdue,
      completionRate,
    }
  }, [items])

  return (
    <div className='w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
      <div className='backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-5 border border-green-400/30 shadow-xl'>
        <div className='flex items-center justify-between mb-2'>
          <div className='text-white/90 text-sm font-semibold'>Completed</div>
          <MdCheckCircle className='text-green-300 text-2xl' />
        </div>
        <div className='text-white text-3xl font-extrabold'>{stats.completed}</div>
        <div className='text-white/70 text-xs mt-1'>{stats.completionRate}% completion rate</div>
      </div>

      <div className='backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl p-5 border border-blue-400/30 shadow-xl'>
        <div className='flex items-center justify-between mb-2'>
          <div className='text-white/90 text-sm font-semibold'>Active</div>
          <MdPending className='text-blue-300 text-2xl' />
        </div>
        <div className='text-white text-3xl font-extrabold'>{stats.active}</div>
        <div className='text-white/70 text-xs mt-1'>
          {stats.priorityStats.High} High, {stats.priorityStats.Medium} Medium, {stats.priorityStats.Low} Low
        </div>
      </div>

      <div className='backdrop-blur-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-5 border border-orange-400/30 shadow-xl'>
        <div className='flex items-center justify-between mb-2'>
          <div className='text-white/90 text-sm font-semibold'>Due Today</div>
          <MdCalendarToday className='text-orange-300 text-2xl' />
        </div>
        <div className='text-white text-3xl font-extrabold'>{stats.dueToday}</div>
        <div className='text-white/70 text-xs mt-1'>{stats.overdue} overdue tasks</div>
      </div>

      <div className='backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-5 border border-purple-400/30 shadow-xl'>
        <div className='flex items-center justify-between mb-2'>
          <div className='text-white/90 text-sm font-semibold'>Total</div>
          <MdTrendingUp className='text-purple-300 text-2xl' />
        </div>
        <div className='text-white text-3xl font-extrabold'>{stats.total}</div>
        <div className='text-white/70 text-xs mt-1'>{stats.archived} archived</div>
      </div>
    </div>
  )
}

export default Statistics
