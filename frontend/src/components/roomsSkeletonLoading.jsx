import "./roomsSkeleton.scss";

export default function RoomsSkeletonLoading() {
  return (
    <>
      <section className="rooms__slider__section">
        <div className="rooms-slider-container">
          <div class="rooms-slider">
            <img className="rooms__img-loading"/>
            <div className="rooms__amenities-loading"></div>
            <h3 className="rooms__type-loading"></h3>
            <p className="rooms__description-loading"></p>
            <div className="rooms__grid-price">
              <span className="rooms__price-loading"></span>
              <form>
                <button className="rooms__button-loading"></button>
              </form>
            </div>
          </div>
          <div class="rooms-slider">
            <img className="rooms__img-loading"/>
            <div className="rooms__amenities-loading"></div>
            <h3 className="rooms__type-loading"></h3>
            <p className="rooms__description-loading"></p>
            <div className="rooms__grid-price">
              <span className="rooms__price-loading"></span>
              <form>
                <button className="rooms__button-loading"></button>
              </form>
            </div>
          </div>
        </div>
      </section>
            
    </>
  );
}
