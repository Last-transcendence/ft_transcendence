import Image from 'next/image';

const CustomImage = ({img, useLoader, alt} : {img:string; useLoader?:true; alt:string}) => {
  const loader = ({ src }: { src: string }): string => {
		return `https://dev.transcendence.42seoul.kr/upload/${src}`;
	};

  // const sizes = useLoader ? '150px' : und
  return (
    <Image
    {...(useLoader ? { loader } : {})}
    src={img}
    alt={alt}
    width="0"
    height="0"
    sizes="100vw"
    style={{ width: '100%', height: 'auto' }}
    priority
  />
    )
}

export default CustomImage;