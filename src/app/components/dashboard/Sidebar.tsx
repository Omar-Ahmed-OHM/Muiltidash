'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, PackagePlus, Settings ,View} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { href: '/dashboard/add-product', label: 'إضافة منتج', icon: PackagePlus },
  { href: '/dashboard/settings', label: 'الإعدادات', icon: Settings },
  { href: '/dashboard/setting', label: 'عرض المنتجات', icon: View },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside
      dir="rtl"
      className="w-64 h-screen bg-gradient-to-b from-[#372740] to-[#5d136d] text-white shadow-xl fixed right-0 top-0 z-40 flex flex-col rounded-l-lg transition-transform duration-300 transform translate-x-full lg:translate-x-0"
    >
      {/* العنوان */}
      <div className="p-6 text-center font-bold text-xl border-b border-white/10">
        لوحة التحكم
      </div>

      {/* عناصر القائمة */}
      <nav className="flex flex-col p-4 gap-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = path === href

          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200
                ${isActive ? 'bg-white/10 text-yellow-300 border-b-4 border-yellow-300' : 'hover:bg-white/20 hover:text-white'}
              `}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
