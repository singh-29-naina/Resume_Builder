import React from 'react'

const Title = ({ eyebrow, title, description }) => {
  return (
    <div className="text-center mt-6 max-w-2xl mx-auto">
      {eyebrow && (
        <span className="font-mono text-xs tracking-widest uppercase text-[#1C4D8D]">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#0F2854] mt-2">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[#667085]">{description}</p>
      )}
    </div>
  )
}

export default Title