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

  const [freeSpace, setFreeSpace] = useState<number>(0)
  const [usedSpace, setUsedSpace] = useState<number>(0)

  useEffect(() => {
    
    if (activeUser) {
      console.log(activeUser.diskSpace, activeUser.usedSpace);
      setFreeSpace(+((activeUser.diskSpace - activeUser.usedSpace ) / (1024 ** 3)).toFixed(2))
      setUsedSpace(+((activeUser.usedSpace ) / (1024 ** 3)).toFixed(2))


      const onePer = activeUser?.diskSpace / 100
      const usedSpaceInPer = ((activeUser.diskSpace - activeUser.usedSpace) / onePer)
      const usrdSpaacePercent = 100 - +usedSpaceInPer.toFixed(2)

      if (usedLineRef?.current) 
        usedLineRef.current.style.width = `${usrdSpaacePercent.toFixed(2)}%`
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
        {usedSpace} / 10 Gb
      </div>

    </div>
  )
}