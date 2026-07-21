import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqfevhxhawhqckvgpfkm.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Bypass Prisma PostgreSQL connection - use REST API instead
export async function getBlogPosts(page: number = 1, perPage: number = 6) {
  const skip = (page - 1) * perPage;

  try {
    // Use REST API instead of direct PostgreSQL
    const { data: posts, error: postsError, count } = await supabase
      .from("Post")
      .select("*", { count: "exact" })
      .eq("category", "blog")
      .eq("published", true)
      .order("publishedAt", { ascending: false })
      .range(skip, skip + perPage - 1);

    if (postsError) {
      console.error("[Blog] Query error:", postsError.message);
      return { posts: [], total: 0 };
    }

    return {
      posts: posts || [],
      total: count || 0,
    };
  } catch (error: any) {
    console.error("[Blog] Unexpected error:", error.message);
    return { posts: [], total: 0 };
  }
}

export async function getAllBlogPosts() {
  try {
    const { data, error } = await supabase
      .from("Post")
      .select("*")
      .eq("category", "blog")
      .eq("published", true)
      .order("publishedAt", { ascending: false });

    if (error) {
      console.error("[Blog] Query error:", error.message);
      return [];
    }

    return data || [];
  } catch (error: any) {
    console.error("[Blog] Unexpected error:", error.message);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("Post")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) {
      console.error("[Post] Query error:", error.message);
      return null;
    }

    return data;
  } catch (error: any) {
    console.error("[Post] Unexpected error:", error.message);
    return null;
  }
}
