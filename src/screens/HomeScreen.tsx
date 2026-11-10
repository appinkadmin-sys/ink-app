import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  Pressable, 
  Animated, 
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useTheme } from '../theme';

const { width } = Dimensions.get('window');

// --- TYPESCRIPT INTERFACES (Ready for Firebase) ---
interface Story {
  id: string;
  username: string;
  avatarUrl: string;
  isAdd?: boolean;
}

interface Post {
  id: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  imageUrl: string;
  likes: number;
  caption: string;
  commentsCount: number;
  timeAgo: string;
}

export default function HomeScreen() {
  const { colors, spacing, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // State for real data
  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState<Story[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // Animation values for Skeleton Loader
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // 1. Start Skeleton Pulse Animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    pulse.start();

    // 2. Simulate Real API Fetch (Replace with Firebase call later)
    const fetchData = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      // This is the structure you will eventually fetch from Firestore
      const fetchedStories: Story[] = [
        { id: '1', username: 'My Story', avatarUrl: 'https://i.pravatar.cc/150?img=11', isAdd: true },
        { id: '2', username: 'alex_v', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
        { id: '3', username: 'prodx', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
        { id: '4', username: 'study_buddy', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
        { id: '5', username: 'math_genius', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
      ];

      const fetchedPosts: Post[] = [
        {
          id: '1',
          user: { username: 'alex_v', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
          likes: 1240,
          caption: 'Late night study session. Calculus is kicking my ass. 📈',
          commentsCount: 14,
          timeAgo: '2h ago'
        },
        {
          id: '2',
          user: { username: 'prodx', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
          imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
          likes: 856,
          caption: 'Taking a break from the books. Anyone up for a group chat?',
          commentsCount: 42,
          timeAgo: '5h ago'
        }
      ];

      setStories(fetchedStories);
      setPosts(fetchedPosts);
      setIsLoading(false);
      pulse.stop();

      // 3. Fade in the feed
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    };

    fetchData();

    return () => pulse.stop();
  }, []);

  // --- SKELETON COMPONENT ---
  const SkeletonCard = () => (
    <Animated.View style={{ opacity: pulseAnim, marginBottom: spacing.xl }}>
      {/* Post Header Skeleton */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.md }}>
        <View style={[styles.skeletonCircle, { backgroundColor: colors.surfaceAlt }]} />
        <View style={[styles.skeletonText, { backgroundColor: colors.surfaceAlt, width: 120, marginLeft: 10 }]} />
      </View>
      {/* Post Image Skeleton */}
      <View style={[styles.skeletonImage, { backgroundColor: colors.surfaceAlt }]} />
      {/* Post Text Skeleton */}
      <View style={{ padding: spacing.md }}>
        <View style={[styles.skeletonText, { backgroundColor: colors.surfaceAlt, width: '80%', marginBottom: 8 }]} />
        <View style={[styles.skeletonText, { backgroundColor: colors.surfaceAlt, width: '60%' }]} />
      </View>
    </Animated.View>
  );

  // --- POST COMPONENT ---
  const renderPost = ({ item }: { item: Post }) => (
    <View style={[styles.postContainer, { borderBottomColor: colors.border }]}>
      {/* Header */}
      <View style={styles.postHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image source={{ uri: item.user.avatarUrl }} style={styles.avatar} />
          <Text style={{ color: colors.text, fontWeight: '700', fontSize: 14 }}>{item.user.username}</Text>
        </View>
        <Pressable>
          <MoreHorizontal size={20} color={colors.text} />
        </Pressable>
      </View>

      {/* Image */}
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />

      {/* Actions */}
      <View style={styles.actionRow}>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Pressable><Heart size={24} color={colors.text} /></Pressable>
          <Pressable><MessageCircle size={24} color={colors.text} /></Pressable>
          <Pressable><Send size={24} color={colors.text} /></Pressable>
        </View>
        <Pressable><Bookmark size={24} color={colors.text} /></Pressable>
      </View>

      {/* Details */}
      <View style={{ paddingHorizontal: spacing.md, paddingBottom: spacing.md }}>
        <Text style={{ color: colors.text, fontWeight: '700', fontSize: 14, marginBottom: 4 }}>
          {item.likes.toLocaleString()} likes
        </Text>
        <Text style={{ color: colors.text, fontSize: 14, lineHeight: 20 }}>
          <Text style={{ fontWeight: '700' }}>{item.user.username} </Text>
          {item.caption}
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 6 }}>
          View all {item.commentsCount} comments
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 4 }}>
          {item.timeAgo}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />

      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm, borderBottomColor: colors.border }]}>
        <Text style={{ fontSize: 26, fontWeight: '900', letterSpacing: -1, color: colors.text }}>
          INK<Text style={{ color: colors.base }}>.</Text>
        </Text>
        <Pressable onPress={() => navigation.navigate('Chats' as any)}>
          <MessageCircle size={26} color={colors.text} strokeWidth={2} />
        </Pressable>
      </View>

      {/* SKELETON LOADER */}
      {isLoading ? (
        <View style={{ flex: 1, paddingTop: spacing.md }}>
          <SkeletonCard />
          <SkeletonCard />
        </View>
      ) : (
        // REAL FEED
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              /* STORIES ROW */
              <FlatList
                horizontal
                data={stories}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: spacing.md, paddingVertical: spacing.md }}
                renderItem={({ item }) => (
                  <View style={{ alignItems: 'center', marginRight: spacing.md, width: 72 }}>
                    <View style={[
                      styles.storyRing, 
                      { borderColor: item.isAdd ? colors.border : colors.base }
                    ]}>
                      <Image source={{ uri: item.avatarUrl }} style={styles.storyAvatar} />
                      {item.isAdd && (
                        <View style={[styles.addIcon, { backgroundColor: colors.base, borderColor: colors.background }]}>
                          <Plus size={12} color="#FFF" strokeWidth={3} />
                        </View>
                      )}
                    </View>
                    <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 6 }} numberOfLines={1}>
                      {item.username}
                    </Text>
                  </View>
                )}
              />
            )}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  skeletonCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  skeletonText: {
    height: 12,
    borderRadius: 4,
  },
  skeletonImage: {
    width: width,
    height: width,
  },
  postContainer: {
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  postImage: {
    width: width,
    height: width,
    backgroundColor: '#1A1D24',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  storyAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  addIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
});