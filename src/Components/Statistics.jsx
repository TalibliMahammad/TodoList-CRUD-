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
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
      <div className='flex items-center gap-3 p-4 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 backdrop-blur-sm'>
        <div className='w-10 h-10 rounded-lg bg-green-500/30 flex items-center justify-center'>
          <MdCheckCircle className='text-green-300 text-xl' />
        </div>
        <div>
          <div className='text-white/70 text-xs'>Tamamlanan</div>
          <div className='text-white text-xl font-bold'>{stats.completed}</div>
          <div className='text-white/60 text-xs'>{stats.completionRate}%</div>
        </div>
      </div>
      <div className='flex items-center gap-3 p-4 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 backdrop-blur-sm'>
        <div className='w-10 h-10 rounded-lg bg-blue-500/30 flex items-center justify-center'>
          <MdPending className='text-blue-300 text-xl' />
        </div>
        <div>
          <div className='text-white/70 text-xs'>Aktiv</div>
          <div className='text-white text-xl font-bold'>{stats.active}</div>
          <div className='text-white/60 text-xs'>H/M/L: {stats.priorityStats.High}/{stats.priorityStats.Medium}/{stats.priorityStats.Low}</div>
        </div>
      </div>
      <div className='flex items-center gap-3 p-4 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 backdrop-blur-sm'>
        <div className='w-10 h-10 rounded-lg bg-orange-500/30 flex items-center justify-center'>
          <MdCalendarToday className='text-orange-300 text-xl' />
        </div>
        <div>
          <div className='text-white/70 text-xs'>Bugün</div>
          <div className='text-white text-xl font-bold'>{stats.dueToday}</div>
          <div className='text-white/60 text-xs'>{stats.overdue} gecikmiş</div>
        </div>
      </div>
      <div className='flex items-center gap-3 p-4 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 backdrop-blur-sm'>
        <div className='w-10 h-10 rounded-lg bg-purple-500/30 flex items-center justify-center'>
          <MdTrendingUp className='text-purple-300 text-xl' />
        </div>
        <div>
          <div className='text-white/70 text-xs'>Cəmi</div>
          <div className='text-white text-xl font-bold'>{stats.total}</div>
          <div className='text-white/60 text-xs'>{stats.archived} arxiv</div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
