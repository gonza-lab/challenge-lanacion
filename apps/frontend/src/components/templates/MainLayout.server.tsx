import React, { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
  header: ReactNode
  footer: ReactNode
}

export default function MainLayout({
  header,
  footer,
  children,
}: MainLayoutProps) {
  return (
    <div className="lay-sidebar">
      <div className="sidebar__main">
        {/* HEADER */}
        {header}

        {/* CONTENT */}
        {children}

        {/* FOOTER */}
        <section className="row">{footer}</section>
      </div>
      <div className="sidebar__aside">
        <div className="banner --desktop --large"></div>
        <div className="com-ranking hlp-none hlp-tablet-none">
          <h2 className="com-title-section-m">Recetas más leídas</h2>
        </div>
        <div className="banner --desktop --large"></div>
      </div>
    </div>
  )
}
