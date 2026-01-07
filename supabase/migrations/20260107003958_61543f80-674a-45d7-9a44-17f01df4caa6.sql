-- Add status column to ai_feedback for tracking sync state
ALTER TABLE public.ai_feedback 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'applied', 'rejected'));

-- Add index for filtering by status
CREATE INDEX IF NOT EXISTS idx_ai_feedback_status ON public.ai_feedback(status);

-- Update existing negative feedback to pending (candidates for review)
UPDATE public.ai_feedback SET status = 'pending' WHERE is_positive = false AND user_correction IS NOT NULL;

-- Mark positive feedback as approved (no action needed)
UPDATE public.ai_feedback SET status = 'approved' WHERE is_positive = true;