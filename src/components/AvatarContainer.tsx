function AvatarContainer({ image, alt }: { image: string; alt?: string }) {
    return (
        <div className='relative overflow-hidden rounded-full size-10 md:size-14 shadow-inner'>
            <img src={image} alt={alt} className='object-cover rounded-full w-full h-full' />
        </div>
    );
}
export default AvatarContainer;
