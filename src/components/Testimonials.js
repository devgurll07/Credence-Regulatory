import { supabase } from "../lib/supabase";
import { testimonials } from "../data/testimonials";
import ReviewsSlider from "./ReviewsSlider";
import AnimatedBg from "./AnimatedBg";

async function getApproved() {
  try {
    const { data } = await supabase
      .from("reviews")
      .select("name, country, rating, message")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(20);
    return (data || []).map((r) => ({
      quote: r.message,
      name: r.name,
      country: r.country,
      rating: r.rating,
    }));
  } catch {
    return [];
  }
}

export default async function Testimonials() {
  const fromDb = await getApproved();
  const reviews = [...testimonials, ...fromDb];

  if (reviews.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-cream">
      <AnimatedBg variant="light" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20">
        <ReviewsSlider reviews={reviews} />
      </div>
    </section>
  );
}