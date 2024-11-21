import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaListUl, FaImage, FaBell } from 'react-icons/fa';

const CarouselContainer = styled.div`
  width: 50%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  overflow: hidden;
  z-index: 1;
`;

const Slide = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2rem;
  text-align: center;
`;

const SlideIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  transform: translateY(0);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    opacity: 1;
  }
`;

const SlideTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const SlideContent = styled.p`
  font-size: 1.2rem;
  max-width: 80%;
`;

const NavigationDots = styled.div`
  position: absolute;
  bottom: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${({ active }) => active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: white;
    transform: scale(1.2);
  }
`;

const slides = [
  {
    icon: <FaListUl />,
    title: "Smart Task Management",
    content: "Organize your tasks efficiently with our intuitive todo system"
  },
  {
    icon: <FaImage />,
    title: "Visual Task Updates",
    content: "Add images to your tasks for better context and clarity"
  },
  {
    icon: <FaBell />,
    title: "Smart Notifications",
    content: "Stay on track with timely reminders and visual notifications"
  }
];

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);


  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <CarouselContainer>
      {slides.map((slide, index) => (
        <Slide key={index} active={currentSlide === index}>
          <SlideIcon>{slide.icon}</SlideIcon>
          <SlideTitle>{slide.title}</SlideTitle>
          <SlideContent>{slide.content}</SlideContent>
        </Slide>
      ))}
      <NavigationDots>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={currentSlide === index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </NavigationDots>
    </CarouselContainer>
  );
};

export default Carousel;