function TopDestination() {
  return (
    <section className="container mx-auto pb-16">
      <h2 className="text-2xl font-bold mb-2">Điểm đến đang thịnh hành</h2>
      <p className="mb-4 font-semibold text-content-secondary">Các lựa chọn phổ biến nhất cho du khách từ Việt Nam</p>
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-row gap-4">
          <div className="w-full relative rounded-lg overflow-hidden">
            <img src="https://cf.bstatic.com/xdata/images/city/800x400/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=" alt="TP. Hồ Chí Minh" className="flex-1 w-['50%']  aspect-[2/1]" />
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="absolute top-2 left-2 text-white text-xl font-bold">
              TP. Hồ Chí Minh<span className="ml-1">🇻🇳</span>
            </div>
          </div>
          <div className="w-full relative rounded-lg overflow-hidden">
            <img src="https://cf.bstatic.com/xdata/images/city/800x400/688956.jpg?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o=" alt="Vũng Tàu" className=" flex-1   w-['50%'] aspect-[2/1]" />
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="absolute top-2 left-2 text-white text-xl font-bold">
              Vũng Tàu<span className="ml-1">🇻🇳</span>
            </div>
          </div>

        </div>
        <div className="flex flex-row gap-4">
          <div className="relative rounded-lg overflow-hidden">
            <img src="https://cf.bstatic.com/xdata/images/city/600x600/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=" alt="Đà Nẵng" className=" aspect-[4/3]" />
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="absolute top-2 left-2 text-white text-xl font-bold">
              Đà Nẵng<span className="ml-1">🇻🇳</span>
            </div>
          </div>
          <div className="relative">
            <img src="https://cf.bstatic.com/xdata/images/city/600x600/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o=" alt="Hà Nội" className="rounded-lg aspect-[4/3]" />
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="absolute top-2 left-2 text-white text-xl font-bold">
              Hà Nội<span className="ml-1">🇻🇳</span>
            </div>
          </div>
          <div className="relative">
            <img src="https://cf.bstatic.com/xdata/images/city/600x600/688831.jpg?k=7b999c7babe3487598fc4dd89365db2c4778827eac8cb2a47d48505c97959a78&o=" alt="Đà Lạt" className="rounded-lg aspect-[4/3]" />
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="absolute top-2 left-2 text-white text-xl font-bold">
              Đà Lạt<span className="ml-1">🇻🇳</span>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

export default TopDestination;
