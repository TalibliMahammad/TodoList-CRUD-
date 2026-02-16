import React, { useRef } from 'react'
import { MdDownload, MdUpload } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { importTodos } from './CounterSlice/CreateSlice'
import { message } from 'antd'

const ExportImport = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.counter.items)
  const fileInputRef = useRef(null)

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(items, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `todos-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      message.success('Todos exported successfully!')
    } catch (error) {
      message.error('Failed to export todos')
    }
  }

  const handleImport = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        if (Array.isArray(imported)) {
          dispatch(importTodos(imported))
          message.success(`Imported ${imported.length} todos!`)
        } else {
          message.error('Invalid file format')
        }
      } catch (error) {
        message.error('Failed to parse file')
      }
    }
    reader.readAsText(file)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleExport}
        disabled={!items || items.length === 0}
        className="h-[56px] px-5 rounded-xl text-white font-semibold bg-white/15 hover:bg-white/25 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 shadow-lg transition-all flex items-center gap-2"
        type="button"
      >
        <MdDownload className="text-xl" />
        Export
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="h-[56px] px-5 rounded-xl text-white font-semibold bg-white/15 hover:bg-white/25 border border-white/20 shadow-lg transition-all flex items-center gap-2"
        type="button"
      >
        <MdUpload className="text-xl" />
        Import
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  )
}

export default ExportImport
