import { type SchemaTypeDefinition } from 'sanity'
import { siteSettings } from './siteSettings'
import { project } from './project'
import { experience } from './experience'
import { education } from './education'
import { research } from './research'
import { client } from './clients'
import { tag } from './tag'
import { tool } from './tool'
import { localeString } from './localeString'
import { localeRichText } from './localeRichText'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    project,
    experience,
    education,
    research,
    client,
    tag,
    tool,
    localeString,
    localeRichText,
  ],
}
