export interface Template {
  id: string
  name: string
  frame: Frame
  objects: any[]
  background: {
    type: string
    value: string
  }
  preview: string
}

interface Frame {
  width: number
  height: number
}

interface ShapeBaseOptions {
  id: string
  name: string
  top: number
  left: number
  angle: number
  width: number
  height: number
  originX: string
  originY: string
  scaleX: number
  scaleY: number
  fill: string
}

interface TextMetadata {
  textAlign: string
  fontFamily: string
  fontSize: number
  fontWeight: string
  charspacing: number
  lineheight: number
  text: string
}

interface ImageMetadata {
  value: string
}

interface ElementMetadata {
  value: number[][]
  fill: string
  preview: string
}

export interface ShapeTemplate<T> extends ShapeBaseOptions {
  metadata: T
}

export type IText = ShapeTemplate<TextMetadata>
export type IImage = ShapeTemplate<ImageMetadata>
export type IElement = ShapeTemplate<ElementMetadata>
export type ShapeType = IText | IImage | IElement

export interface Uploading {
  status: string
  progress: number
}
export interface IUpload {
  id: string
  contentType: string
  folder: string
  name: string
  type: string
  url: string
}

type FontVariant = '300' | 'regular' | '400' | '500' | '600' | '700' | '800'

type FontFile = Record<FontVariant, string>
export interface IFontFamily {
  id: string
  family: string
  variants: FontVariant[]
  files: FontFile[]
  subsets: string[]
  version: string
  lastModified: string
  category: string
  kind: string
}
