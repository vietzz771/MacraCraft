import { ArrowRightOutlined } from '@ant-design/icons';
import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from '@/constants/routes';
import {
  useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop
} from '@/hooks';
import bannerImg from '@/images/banner.png';
import slide1 from '@/images/slide1.png';
import slide2 from '@/images/slide2.png';
import slide3 from '@/images/slide3.jpg';
import slide4 from '@/images/slide4.png';
import slide5 from '@/images/slide5.jpg';
import slide6 from '@/images/slide6.jpg';
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

const Home = () => {
  useDocumentTitle('MacraCraft | Home');
  useScrollTop();

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended
  } = useRecommendedProducts(6);

  return (
    <main className="content">
      <div className="home">
        <div className="banner">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>Experience</strong>
              &nbsp;the Art of&nbsp;
              <strong>Macrame</strong>
            </h1>
            <p>
              Purchasing macrame should bring you joy and style, all while being affordable.
              From totes to bottle holders and beyond—we’ve got your macrame needs covered.
            </p>
            <br />
            <Link to={SHOP} className="button">
              Shop Now &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img"><img src={bannerImg} alt="" /></div>
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Featured Products</h1>
            <Link to={FEATURED_PRODUCTS}>See All</Link>
          </div>
          {(errorFeatured && !isLoadingFeatured) ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts}
              skeletonCount={6}
            />
          )}
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Recommended Products</h1>
            <Link to={RECOMMENDED_PRODUCTS}>See All</Link>
          </div>
          {(errorRecommended && !isLoadingRecommended) ? (
            <MessageDisplay
              message={errorRecommended}
              action={fetchRecommendedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={recommendedProducts}
              skeletonCount={6}
            />
          )}
        </div>
        <div className="container-img">
          <h1 className="heading">Macrame Gallery</h1>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"
          >
            <SwiperSlide>
              <img src={slide1} alt="slide_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide2} alt="slide_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide3} alt="slide_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide4} alt="slide_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide5} alt="slide_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide6} alt="slide_image" />
            </SwiperSlide>

            <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow">
                <span>
                  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m16.18 3.2688c-0.3906-0.39052-1.0237-0.39052-1.4143 0l-6.6444 6.6445c-1.1713 1.1713-1.1716 3.0701-8.2e-4 4.2418l6.5703 6.5754c0.3905 0.3906 1.0237 0.3906 1.4142 0 0.3905-0.3905 0.3905-1.0237 0-1.4142l-6.572-6.572c-0.39052-0.3906-0.39052-1.0237 0-1.4142l6.647-6.647c0.3905-0.39053 0.3905-1.0237 0-1.4142z" fill="#0F0F0F" />
                  </svg>
                </span>
              </div>
              <div className="swiper-button-next slider-arrow">
                <span><svg transform="rotate(180)" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m16.18 3.2688c-0.3906-0.39052-1.0237-0.39052-1.4143 0l-6.6444 6.6445c-1.1713 1.1713-1.1716 3.0701-8.2e-4 4.2418l6.5703 6.5754c0.3905 0.3906 1.0237 0.3906 1.4142 0 0.3905-0.3905 0.3905-1.0237 0-1.4142l-6.572-6.572c-0.39052-0.3906-0.39052-1.0237 0-1.4142l6.647-6.647c0.3905-0.39053 0.3905-1.0237 0-1.4142z" fill="#0F0F0F" />
                </svg></span>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
        </div>
      </div>
    </main>
  );
};

export default Home;
