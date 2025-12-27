import { Application, extend, useTick } from "@pixi/react";
import {
  Container,
  Sprite,
  TextureSource,
  Assets,
  Texture,
  Rectangle,
} from "pixi.js";
import { useState, useEffect } from "react";

extend({
  Container,
  Sprite,
});

TextureSource.defaultOptions.scaleMode = "linear";

const OpeningScene = () => {
  const [rotation, setRotation] = useState(0);
  const [treeTexture, setTreeTexture] = useState(Texture.EMPTY);

  useEffect(() => {
    // 1. 전체 시트 이미지 로드
    Assets.load("/spr_tileset_sunnysideworld_16px.png").then((baseTexture) => {
      // 2. 나무 이미지 위치 잘라내기 (좌표는 예시입니다, 실제 이미지에서 측정 필요)
      // 오른쪽 상단 나무 뭉텅이 중 하나를 가져온다고 가정
      const frame = new Rectangle(
        784, // x 좌표 (픽셀 단위)
        0, // y 좌표
        48, // 가로 크기 (16px * 3칸)
        64 // 세로 크기 (16px * 4칸)
      );

      // 3. 잘라낸 부분으로 새로운 텍스처 생성
      const trimmedTree = new Texture({
        source: baseTexture.source,
        frame: frame,
      });

      setTreeTexture(trimmedTree);
    });
  }, []);

  // 이미지 로드
  useEffect(() => {
    Assets.load("https://pixijs.com/assets/bunny.png").then((loadedTexture) => {
      setTreeTexture(loadedTexture);
    });
  }, []);

  useTick((ticker) => {
    setRotation(Math.sin(Date.now() * 0.002) * 0.05);
  });

  return (
    <pixiSprite
      texture={treeTexture}
      x={400}
      y={500}
      anchor={{ x: 0.5, y: 1 }}
      rotation={rotation}
    />
  );
};

export default function App() {
  return (
    <Application width={800} height={600} backgroundColor={0x1099bb}>
      <pixiContainer>
        <OpeningScene />
      </pixiContainer>
    </Application>
  );
}
