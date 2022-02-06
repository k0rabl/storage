import { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

import './spaceUsed.sass'


const mapState = (state: RootState) => ({
  activeUser: state.auth.activeUser
})


export const SpaceUsed: FC<{}> = () => {
  const { activeUser } = useSelector(mapState)
  const usedLineRef = useRef<HTMLDivElement>(null)

  const [usedSpace, setUsedSpace] = useState<number>(0)

  useEffect(() => {
    
    if (activeUser) {
      setUsedSpace(+((activeUser.usedSpace ) / (1024 ** 3)).toFixed(2))

      const onePer = activeUser?.diskSpace / 100
      const freeSpaceInPer = ((activeUser.diskSpace - activeUser.usedSpace) / onePer)
      const usedSpaacePercent = 100 - +freeSpaceInPer.toFixed(2)

      
      if (usedLineRef?.current) {
        
        if (usedSpaacePercent > 90)
         usedLineRef.current?.classList.add('spaceUsed__line-wrong')

        usedLineRef.current.style.width = `${usedSpaacePercent.toFixed(2)}%`

      }
    }
    
  }, [])


  return (
    <div className="spaceUsed">
      <div className="spaceUsed__line">
        <div ref={usedLineRef} className="spaceUsed__line-used">
          <div className="spaceUsed__usedDigit">{usedSpace} Gb</div>
        </div>
      </div>
      <div className="spaceUsed__digits">
        {usedSpace}<small>GB of</small> 10<small>GB</small>
      </div>

    </div>
  )
}