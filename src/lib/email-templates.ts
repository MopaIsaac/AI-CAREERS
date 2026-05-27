import fs from 'fs/promises'
import path from 'path'

/**
 * Loads an email template and replaces placeholders with values.
 * Placeholders should be in the format {{variableName}}.
 */
export async function getEmailTemplate(templateName: string, variables: Record<string, string>) {
  try {
    const templatePath = path.join(process.cwd(), 'public', 'emails', `${templateName}.html`)
    let content = await fs.readFile(templatePath, 'utf8')
    
    // Simple regex replacement for {{variable}}
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g')
      content = content.replace(regex, value)
    })
    
    return content
  } catch (error) {
    console.error(`Error loading template ${templateName}:`, error)
    return null
  }
}
