import React, { useState } from 'react';
import AvatarCard from '@/components/ui/avatar-card';
import KitImageModal from '@/kit/components/KitImageModal/KitImageModal';
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { OrderProducts } from '@/kit/models/Order';

function ThumbnailPlugin(mainRef: React.MutableRefObject<KeenSliderInstance | null>): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => slide.classList.remove('active'));
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add('active');
    }
    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on('created', () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on('animationStarted', (main: any) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default function ProductImageCell({ product }: { product: OrderProducts }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [ProductDetailPageImages, setProductDetailPageImages] = useState<any[]>([]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({ initial: 0 });
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: { perView: 4, spacing: 6 },
      breakpoints: {
        '(min-width: 768px)': {
          slides: { perView: 6, spacing: 10 },
        },
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  const baseUrl = process.env.NEXT_PUBLIC_CATEGORY_BASE_API?.replace(/\/$/, '');
  const relativePath = product.productUrl?.[0]?.replace(/^\//, '');
  const fullUrl = `${baseUrl}/${relativePath}`;

  const openModal = () => {
    const images = product.productUrl?.map((url) => ({
      image: `${baseUrl}/${url.replace(/^\//, '')}`,
      id: url,
    })) || [];
    setProductDetailPageImages(images);
    setModalOpen(true);
  };

  return (
    <>
      <AvatarCard
        src={fullUrl}
        avatarProps={{
          name: product.productName,
          size: 'lg',
          className: 'rounded-lg',
        }}
        onClick={openModal}
      />
      <KitImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        reverseButtonColour={true}
      >
        <div className="space-y-4">
          <div ref={sliderRef} className="keen-slider">
            {ProductDetailPageImages.map((item, idx) => (
              <div key={item.id || idx} className="keen-slider__slide flex justify-center">
                <img
                  src={item.image}
                  alt="Product"
                  className="w-[650px] h-[650px] object-contain rounded-2xl bg-white"
                />
              </div>
            ))}
          </div>
          <div ref={thumbnailRef} className="keen-slider desktopThumbnail">
            {ProductDetailPageImages.map((item, idx) => (
              <div key={item.id || idx} className="keen-slider__slide cursor-pointer">
                <img
                  src={item.image}
                  alt="Thumbnail"
                  className="w-full !h-28 object-contain rounded bg-white"
                />
              </div>
            ))}
          </div>
        </div>
      </KitImageModal>
    </>
  );
}
