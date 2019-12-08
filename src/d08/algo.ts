export function splitLayers(
  imageData: number[],
  width: number,
  height: number
): number[][] {
  const layerSize = width * height;

  const layers = [];

  for (let i = 0; i < imageData.length / layerSize; i++) {
    layers.push(imageData.slice(i * layerSize, (i + 1) * layerSize));
  }

  return layers;
}

export function calculateZeros(layer: number[]): number {
  return layer.reduce((prevValue, currentValue) => {
    if (currentValue === 0) {
      return prevValue + 1;
    }

    return prevValue;
  }, 0);
}

export function getLayerWithFewestZeros(layers: number[][]): number[] {
  const layerInfo = layers.reduce((prevValue, currentValue, currentIndex) => {
    const zeros = calculateZeros(currentValue);

    if (!prevValue || prevValue[0] > zeros) {
      return [zeros, currentIndex];
    }

    return prevValue;
  }, null);

  return layers[layerInfo[1]];
}

export function calculateLayerChecksum(layer: number[]): number {
  const [oneDigits, twoDigits] = layer.reduce(
    (prevValue, currentValue) => {
      if (currentValue === 1) {
        return [prevValue[0] + 1, prevValue[1]];
      }

      if (currentValue === 2) {
        return [prevValue[0], prevValue[1] + 1];
      }

      return prevValue;
    },
    [0, 0]
  );

  return oneDigits * twoDigits;
}

export function calculateChecksum(layers: number[][]): number {
  return calculateLayerChecksum(getLayerWithFewestZeros(layers));
}

export function decodePixels(layers: number[][]): number[] {
  const resultPixels = [];

  for (let i = 0; i < layers[0].length; i++) {
    let pixel: number;
    for (let j = 0; j < layers.length; j++) {
      const currentDigit = layers[j][i];
      if (pixel == null || pixel === 2) {
        pixel = currentDigit;
        continue;
      }
    }
    resultPixels.push(pixel);
  }

  return resultPixels;
}

export function renderImage(pixels: number[], width: number): string {
  const lines = [];

  for (let i = 0; i < pixels.length / width; i++) {
    lines.push(
      pixels
        .slice(i * width, (i + 1) * width)
        .join('')
        .replace(/0/g, ' ')
    );
  }

  return lines.join('\n');
}
