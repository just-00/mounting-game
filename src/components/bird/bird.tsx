import { useEffect, useRef, useState } from 'react'
import './index.scss'
import { Like } from '@react-vant/icons'
import { IMG_URL } from '@/const/ResourceUrl'

const COLOR_ONE_CLICK = 'deeppink'
const COLOR_DOUBLE_CLICK = 'gold'

type Props = {isFlying?: boolean}

export const Bird = (props: Props) => {
    const {isFlying} = props
    const [position, setPosition] = useState<{
        left: number,
        top: number
    }>({
        left: 0,
        top: 0
    })
    const times = useRef<number>(30)
    const isDown = useRef<boolean>(true)
    const [showLike, setShowLike] = useState<boolean>(false)
    const [color, setColor] = useState<string>(COLOR_ONE_CLICK)
    const time = useRef<number>(null)

    const likeme = () => {
        time.current = setTimeout(() => {
            clearTimeout(time.current as number)
            setShowLike(false)
            setColor(COLOR_ONE_CLICK)
        }, 2000)
        if(showLike){
            setColor(COLOR_DOUBLE_CLICK)
        }
        setShowLike(true)
    }
    useEffect(() => {
        console.log(isFlying)
        if(!isFlying) return
        const inter = setInterval(() => {
            if(times.current<0){
                isDown.current = Math.random() > 0.2
                times.current = Math.random() * 10 + 20
            }
            let left = position.left
            let top = position.top
            if(position.left > 420){
                left = -40
                top = Math.random() * 100
            }
            times.current = times.current - 1
            const param:number = 0.5
            setPosition({
                left: left + 0.5,
                top: top <=0 ? top + param: top + (isDown.current? param : -1 *param),
            })
        }, 20)
        return () => {
            clearInterval(inter)
        }
    }, [position,isFlying])
    return  <div className="pixel-bird" onClick={likeme}  style={{
        left: position.left,
        top: position.top
    }} >
    <img className='body'src={IMG_URL.BIRD}/>
    {
        showLike&& <Like className='like' color={color} />
    }
  </div>
}