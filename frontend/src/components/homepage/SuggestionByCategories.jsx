function SuggestionByCategories() {
  return (
    <section className="container mx-auto pb-16">
      <h1 className="text-2xl font-extrabold mb-8">Tìm theo loại chỗ nghỉ</h1>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 text-center w-full">
          <img src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=" alt="Khách sạn" className="rounded-lg mb-2 w-full aspect-[3/2] " />
          <p className='font-bold text-xl text-center '>Khách sạn</p>
        </div>
        <div className="flex-1 text-center w-full">
          <img src="https://r-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=330x250" alt="Căn hộ" className="rounded-lg mb-2 w-full aspect-[3/2]" />
          <p className='font-bold text-xl text-center'>Căn hộ</p>
        </div>
        <div className="flex-1 text-center w-full">
          <img src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=" alt="Các resort" className="rounded-lg mb-2 w-full aspect-[3/2]" />
          <p className='font-bold text-xl text-center'>Resort</p>
        </div>
        <div className="flex-1 text-center w-full">
          <img src="https://r-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=" alt="Các biệt thự" className="rounded-lg mb-2 w-full aspect-[3/2]" />
          <p className='font-bold text-xl text-center'>Các biệt thự</p>
        </div>
      </div>
    </section>
  );
}

export default SuggestionByCategories;
