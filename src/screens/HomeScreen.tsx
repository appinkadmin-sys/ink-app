import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { useTheme } from '../theme';

// --- Types ---
type Story = {
  id: string;
  name: string;
  avatar: string;
};

type Post = {
  id: string;
  user: { name: string; avatar: string };
  image: string;
  caption: string;
  likes: number;
  comments: number;
};

// --- Mock Data (We will connect this to Firestore later) ---
const MOCK_STORIES: Story[] = [
  { id: '1', name: 'Amara', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Kofi', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Zola', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Sipho', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Lerato', avatar: 'https://i.pravatar.cc/150?img=5' },
];

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    user: { name: 'Amara N.', avatar: 'https://i.pravatar.cc/150?img=1' },
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=800&auto=format&fit=crop',
    caption: 'Late night study session. Calculus is kicking my butt but we move. 📚📉',
    likes: 124,
    comments: 12,
  },
  {
    id: '2',
    user: { name: 'Kofi M.', avatar: 'https://i.pravatar.cc/150?img=2' },
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    caption: 'Library vibes today. Anyone want to join for a group study?',
    likes: 89,
    comments: 5,
  },
];

export default function HomeScreen() {
  const { colors, spacing, radii, typography } = useTheme();
  const [loading, setLoading] = useState(true);

  // Simulate network fetch
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // --- Skeleton Loader Component ---
  const Skeleton = () => (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonHeader}>
        <View style={[styles.skeletonAvatar, { backgroundColor: colors.surfaceAlt }]} />
        <View style={[styles.skeletonText, { backgroundColor: colors.surfaceAlt, width: 100 }]} />
      </View>
      <View style={[styles.skeletonImage, { backgroundColor: colors.surfaceAlt }]} />
      <View style={[styles.skeletonText, { backgroundColor: colors.surfaceAlt, width: '80%' }]} />
      <View style={[styles.skeletonText, { backgroundColor: colors.surfaceAlt, width: '60%', marginTop: 8 }]} />
    </View>
  );

  // --- Header Component ---
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.logo, { color: colors.brand, fontSize: typography.h2 }]}>
        Ink.
      </Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={{ fontSize: 20 }}>🔔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- Stories Row Component ---
  const renderStories = () => (
    <View style={styles.storiesWrapper}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={MOCK_STORIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
        renderItem={({ item }) => (
          <View style={styles.storyItem}>
            <View style={[styles.storyRing, { borderColor: colors.brand }]}>
              <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
            </View>
            <Text style={[styles.storyName, { color: colors.textMuted, fontSize: typography.body - 2 }]}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );

  // --- Feed Post Component ---
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Image source={{ uri: item.user.avatar }} style={styles.postAvatar} />
        <Text style={[styles.postUsername, { color: colors.text, fontSize: typography.body, fontWeight: '600' }]}>
          {item.user.name}
        </Text>
      </View>

      {/* Post Image */}
      <Image source={{ uri: item.image }} style={styles.postImage} />

      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.actionLeft}>
          <TouchableOpacity style={styles.actionBtn}><Text style={{ fontSize: 24 }}>🤍</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={{ fontSize: 24 }}>💬</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={{ fontSize: 24 }}>✈️</Text></TouchableOpacity>
        </View>
        <TouchableOpacity><Text style={{ fontSize: 24 }}>🔖</Text></TouchableOpacity>
      </View>

      {/* Post Footer */}
      <View style={styles.postFooter}>
        <Text style={[styles.likes, { color: colors.text, fontSize: typography.body, fontWeight: '600' }]}>
          {item.likes} likes
        </Text>
        <Text style={[styles.caption, { color: colors.text, fontSize: typography.body }]}>
          <Text style={{ fontWeight: '600' }}>{item.user.name} </Text>
          {item.caption}
        </Text>
        <Text style={[styles.comments, { color: colors.textMuted, fontSize: typography.body - 2, marginTop: 4 }]}>
          View all {item.comments} comments
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        {renderStories()}
        <Skeleton />
        <Skeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            {renderStories()}
          </>
        }
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
      />
      
      {/* Fixed Header (Absolute positioned so it stays on top) */}
      <View style={[styles.fixedHeader, { backgroundColor: colors.background }]}>
        {renderHeader()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 50, // Adjust based on your notch/status bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  logo: {
    fontWeight: '800',
    letterSpacing: -1,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconBtn: {
    padding: 8,
  },
  storiesWrapper: {
    marginTop: 60, // Pushes stories below the fixed header
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // Using raw hex to match theme border
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyName: {
    marginTop: 2,
  },
  postContainer: {
    marginBottom: 24,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  postUsername: {},
  postImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionLeft: {
    flexDirection: 'row',
  },
  actionBtn: {
    marginRight: 16,
  },
  postFooter: {
    paddingHorizontal: 16,
  },
  likes: {
    marginBottom: 6,
  },
  caption: {
    lineHeight: 20,
  },
  skeletonContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  skeletonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  skeletonAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  skeletonText: {
    height: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 12,
  },
});