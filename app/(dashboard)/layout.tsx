import Header from '@/components/header'
import React from 'react'

type props = {
    children: React.ReactNode
}

const layout = ({ children }: props) => {
    return (
        
        <>
            <Header />
            <main className='px-3 lg:px-14'>
                {children}
            </main>
        </>
    )
}

export default layout