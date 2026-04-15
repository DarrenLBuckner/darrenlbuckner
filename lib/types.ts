export interface StoryBlock {
  id: string
  title: string
  content: string
  era: string
  themes: string[]
  audience_fit: string[]
  tone: string
  is_public: boolean
  weight: number
}

export interface ContextProfile {
  id: string
  slug: string
  label: string
  description: string
  required_themes: string[]
  excluded_themes: string[]
  bio_length: number
  tone: string
}

export interface Venture {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  url: string | null
  status: string
  category: string
  years_active: string
  highlight_metric: string | null
  display_order: number
  is_featured: boolean
}

export interface PressItem {
  id: string
  title: string
  outlet: string
  url: string | null
  embed_url: string | null
  type: string
  published_date: string
  is_featured: boolean
}

export interface SpeakingTopic {
  id: string
  title: string
  description: string
  audience_fit: string[]
  is_featured: boolean
  display_order: number
}

export interface Bio {
  id: string
  context_slug: string
  content: string
  word_count: number
  generated_at: string
  is_current: boolean
}

export interface Insight {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  published_date: string
  is_published: boolean
  read_time: string | null
  created_at?: string
  updated_at?: string
}

export interface InquiryLead {
  id: string
  name: string
  email: string
  organization: string | null
  inquiry_type: string
  message: string
  context: string | null
  created_at: string
  is_read: boolean
}
