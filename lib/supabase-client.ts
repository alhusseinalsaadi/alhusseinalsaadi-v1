import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqfevhxhawhqckvgpfkm.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key-for-build";

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

// Get post by ID (for admin editing)
export async function getPostById(id: string) {
  try {
    const { data, error } = await supabase
      .from("Post")
      .select("*")
      .eq("id", id)
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

// Update post
export async function updatePost(id: string, data: any) {
  try {
    const { data: updated, error } = await supabase
      .from("Post")
      .update({
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        category: data.category,
        coverImage: data.coverImage || null,
        published: data.published,
        publishedAt: data.published ? new Date().toISOString() : null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[Post] Update error:", error.message);
      return null;
    }

    return updated;
  } catch (error: any) {
    console.error("[Post] Update error:", error.message);
    return null;
  }
}

// Delete post
export async function deletePost(id: string) {
  try {
    const { error } = await supabase
      .from("Post")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[Post] Delete error:", error.message);
      return false;
    }

    return true;
  } catch (error: any) {
    console.error("[Post] Delete error:", error.message);
    return false;
  }
}

// Get all posts with filters
export async function getAllPosts(category: string = "blog", published: boolean = true) {
  try {
    let query = supabase
      .from("Post")
      .select("id, title, slug, excerpt, category, published, publishedAt, createdAt");

    if (category) {
      query = query.eq("category", category);
    }

    if (published) {
      query = query.eq("published", true);
    }

    const { data, error } = await query.order("publishedAt", { ascending: false });

    if (error) {
      console.error("[Posts] Query error:", error.message);
      return [];
    }

    return data || [];
  } catch (error: any) {
    console.error("[Posts] Unexpected error:", error.message);
    return [];
  }
}

// Create post
export async function createPost(data: any) {
  try {
    const { data: created, error } = await supabase
      .from("Post")
      .insert([
        {
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt,
          category: data.category,
          coverImage: data.coverImage || null,
          published: data.published,
          publishedAt: data.published ? new Date().toISOString() : null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("[Post] Create error:", error.message);
      return null;
    }

    return created;
  } catch (error: any) {
    console.error("[Post] Create error:", error.message);
    return null;
  }
}
