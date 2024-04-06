export const isMobile = () => {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
};

export const isUsingWebGL2 = (canvas: HTMLCanvasElement) => {
  return Boolean(canvas.getContext('webgl2'));
};

export const supportsLinearFiltering = (canvas: HTMLCanvasElement) => {
  const context = getWebGLContext(canvas);
  return Boolean(context?.ext.supportLinearFiltering);
}

export const getWebGLContext = (canvas: HTMLCanvasElement) => {
  let halfFloat;
  let supportLinearFiltering;

  const gl = canvas.getContext('webgl2', {
    stencil: false,
    antialias: false,
    depth: false,
    alpha: true
  });

  if(!gl) return;
  
  gl.getExtension('EXT_color_buffer_float');
  supportLinearFiltering = gl.getExtension('OES_texture_float_linear');

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  if(!halfFloat) return;

  const halfFloatTexType = gl.HALF_FLOAT;
  let formatRGBA;
  let formatRG;
  let formatR;

  if (isUsingWebGL2(canvas)) {
    formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
  }
  else {
    formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
  }

  ga('send', 'event', isWebGL2 ? 'webgl2' : 'webgl', formatRGBA == null ? 'not supported' : 'supported');

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering
    }
  };
}

declare global {
  interface CanvasRenderingContext2D {
    getExtension: () => {};
  }
}