import React from 'react'

function Footer() {
  return (
    <section className="body-font bg-gray-900 text-white">
      <div className="flex flex-wrap px-5 py-12 mx-auto items-center">
        <div className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-gray-400">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Pitchfork Kickstarter Taxidermy</h1>
          <p className="leading-relaxed text-base text-gray-200">Locavore cardigan small batch roof party blue bottle blog meggings sartorial jean shorts kickstarter migas sriracha church-key synth succulents. Actually taiyaki neutra, distillery gastropub pok pok ugh.</p>
        </div>
        <div className="flex flex-col md:w-1/2 md:pl-12">
          <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-3">CATEGORIES</h2>
          <nav className="flex flex-wrap list-none -mb-1">
            <li className="lg:w-1/3 mb-1 w-1/2">
              <a className="text-gray-200 hover:text-gray-400">First Link</a>
            </li>
            <li className="lg:w-1/3 mb-1 w-1/2">
              <a className="text-gray-200 hover:text-gray-400">Second Link</a>
            </li>
            <li className="lg:w-1/3 mb-1 w-1/2">
              <a className="text-gray-200 hover:text-gray-400">Third Link</a>
            </li>
            <li className="lg:w-1/3 mb-1 w-1/2">
              <a className="text-gray-200 hover:text-gray-400">Fourth Link</a>
            </li>
            <li className="lg:w-1/3 mb-1 w-1/2">
              <a className="text-gray-200 hover:text-gray-400">Fifth Link</a>
            </li>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Footer
