import { IElement, IFontFamily, IUpload } from '@/interfaces/editor'
import axios, { AxiosInstance } from 'axios'

type Template = any
class ApiService {
  base: AxiosInstance
  constructor() {
    this.base = axios.create({
      baseURL: 'https://api.scenify.io',
      headers: {
        Authorization: 'Bearer 9xfZNknNmE4ALeYS6ZCWX8pb',
      },
    })
  }

  // UPLOADS
  getSignedURLForUpload(props: { name: string }): Promise<{ url: string }> {
    return new Promise((resolve, reject) => {
      this.base
        .post('/uploads', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  updateUploadFile(props: { name: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.base
        .put('/uploads', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  getUploads(): Promise<IUpload[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get('/uploads')
        resolve(data.data)
      } catch (err) {
        reject(err)
      }
    })
  }

  deleteUpload(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.base.delete(`/uploads/${id}`)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  // TEMPLATES

  createTemplate(props: Partial<Template>): Promise<Template> {
    return new Promise((resolve, reject) => {
      this.base
        .post('/templates', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  downloadTemplate(props: Partial<Template>): Promise<{ source: string }> {
    return new Promise((resolve, reject) => {
      this.base
        .post('/templates/download', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  getTemplates(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get('/templates')
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  getTemplateById(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get(`/templates/${id}`)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
  //CREATIONS

  createCreation(props: Partial<Template>): Promise<Template> {
    return new Promise((resolve, reject) => {
      this.base
        .post('/creations', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  getCreations(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get('/creations')
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  getCreationById(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get(`/creations/${id}`)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
  updateCreation(id: string, props: Partial<Template>): Promise<Template> {
    return new Promise((resolve, reject) => {
      this.base
        .put(`/creations/${id}`, props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  // ELEMENTS
  getElements(): Promise<IElement[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get('/elements')
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
  updateTemplate(id: number, props: Partial<Template>): Promise<Template> {
    return new Promise((resolve, reject) => {
      this.base
        .put(`/templates/${id}`, props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }
  // FONTS
  getFonts(): Promise<IFontFamily[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get('/fonts')
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default new ApiService()
