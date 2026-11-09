import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Pressable, 
  Animated, 
  Dimensions,
  Modal
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  PlusSquare, 
  Search, 
  Home, 
  User,
  X,
  Wind
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useTheme } from '../theme';

const { width } = Dimensions.get('window');

// --- REAL DATA STRUCTURE (Replace with Firebase later) ---
const STORIES = [
  { id: '1', name: 'My Story', avatar: 'https://i.pravatar.cc/150?img=1', isAdd: true },
  { id: '2', name: 'alex_v', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'prodx', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const POSTS = [
  { 
    id: '1', 
    user: 'alex_v', 
    avatar: 'https://i.pravatar.cc/150?img=2',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    likes: 1240,
    caption: 'Late night drive in the city.',
    time: '2h ago'
  },
];

export default function HomeScreen() {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const skeletonAnim = useRef(new Animated.Value(0.3)).current;
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [isSilent, setIsSilent] = useState(false); // Set to true to test the empty state
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  useEffect(() => {
    // 1. Skeleton Pulse Animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(skeletonAnim, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(skeletonAnim, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    pulse.start();

    // 2. Simulate Data Fetching
    setTimeout(() => {
      pulse.stop();
      setIsLoading(false);
      // Fade in the feed or silent state
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, 2000);

    return () => pulse.stop();
  }, []);

  // Full screen post view
  const renderFullScreenPost = () => {
    if (!selectedPost) return null;
    return (
      <Modal visible={true} transparent={true} animationType="fade">
        <View style={styles.fullScreenModal}>
          <Pressable style={styles.closeButton} onPress={() => setSelectedPost(null)}>
            <X size={32} color="#FFF" />
          </Pressable>
          <Image source={{ uri: selectedPost }} style={styles.fullScreenImage} resizeMode="contain" />
          <View style={styles.fullScreenOverlay}>
            <View style={{ flexDirection: 'row', gap: 20, marginBottom: 12 }}>
              <Heart size={28} color="#FFF" />
              <MessageCircle size={28} color="#FFF" />
              <Send size={28} color="#FFF" />
            </View>
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>alex_v</Text>
            <Text style={{ color: '#FFF' }}>Late night drive in the city.</Text>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />

      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.logoText}>INK<Text style={{ color: colors.base }}>.</Text></Text>
        <Pressable onPress={() => navigation.navigate('Chats' as any)}>
           <MessageCircle size={26} color={colors.text} strokeWidth={2} />
        </Pressable>
      </View>

      {/* LOADING SKELETON */}
      {isLoading && (
        <Animated.View style={{ padding: 20, opacity: skeletonAnim }}>
          <View style={{ flexDirection: 'row', gap: 16, marginBottom: 24 }}>
            <View style={[styles.skeleton, { width: 68, height: 68, borderRadius: 34 }]} />
            <View style={[styles.skeleton, { width: 68, height: 68, borderRadius: 34 }]} />
            <View style={[styles.skeleton, { width: 68, height: 68, borderRadius: 34 }]} />
          </View>
          <View style={[styles.skeleton, { width: '100%', height: 300, borderRadius: 16 }]} />
        </Animated.View>
      )}

      {/* FEED OR SILENT STATE */}
      {!isLoading && (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            
            {/* STORIES ROW */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
              {STORIES.map((story) => (
                <View key={story.id} style={styles.storyItem}>
                  <View style={[styles.storyRing, { borderColor: story.isAdd ? colors.border : colors.base }]}>
                    <Image source={{ uri: story.avatar }} style={styles.storyImage} />
                    {story.isAdd && (
                      <View style={[styles.addIcon, { backgroundColor: colors.base, borderColor: colors.background }]}>
                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>+</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.storyName, { color: colors.textMuted }]} numberOfLines={1}>
                    {story.name}
                  </Text>
                </View>
              ))}
            </ScrollView>

            {/* SILENT / EMPTY STATE */}
            {isSilent ? (
              <View style={styles.silentState}>
                <View style={[styles.silentIcon, { backgroundColor: colors.surface }]}>
                  <Wind size={40} color={colors.textMuted} />
                </View>
                <Text style={[styles.silentTitle, { color: colors.text }]}>Silent</Text>
                <Text style={[styles.silentBody, { color: colors.textMuted }]}>
                  Follow people to see their posts here.
                </Text>
                <Pressable style={[styles.findBtn, { backgroundColor: colors.base }]}>
                  <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Find People</Text>
                </Pressable>
              </View>
            ) : (
              // ACTUAL FEED
              POSTS.map((post) => (
                <View key={post.id} style={[styles.postContainer, { borderBottomColor: colors.border }]}>
                  
                  {/* Post Header */}
                  <View style={styles.postHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
                      <Text style={{ color: colors.text, fontWeight: '700', fontSize: 14 }}>{post.user}</Text>
                    </View>
                  </View>

                  {/* Post Image (Tappable for Fullscreen) */}
                  <Pressable onPress={() => setSelectedPost(post.image)}>
                    <Image source={{ uri: post.image }} style={styles.postImage} />
                  </Pressable>

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
                  <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                    <Text style={{ color: colors.text, fontWeight: '700', fontSize: 14, marginBottom: 4 }}>
                      {post.likes.toLocaleString()} likes
                    </Text>
                    <Text style={{ color: colors.text, fontSize: 14, lineHeight: 20 }}>
                      <Text style={{ fontWeight: '700' }}>{post.user} </Text>
                      {post.caption}
                    </Text>
                    <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 6 }}>
                      {post.time}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </Animated.View>
      )}

      {/* FULL SCREEN MODAL */}
      {renderFullScreenPost()}

      {/* BOTTOM TAB BAR */}
      <View style={[styles.tabBar, { backgroundColor: colors.background, borderTopColor: colors.border, paddingBottom: insets.bottom || 16 }]}>
        <Pressable><Home size={26} color={colors.text} /></Pressable>
        <Pressable><Search size={26} color={colors.textMuted} /></Pressable>
        <Pressable><PlusSquare size={26} color={colors.textMuted} /></Pressable>
        <Pressable><MessageCircle size={26} color={colors.textMuted} /></Pressable>
        <Pressable><User size={26} color={colors.textMuted} /></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  logoText: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -1,
    color: '#FAFAFA',
  },
  skeleton: {
    backgroundColor: '#1A1D24',
  },
  storiesContainer: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 72,
  },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  storyImage: {
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
  storyName: {
    fontSize: 12,
    textAlign: 'center',
  },
  silentState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  silentIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  silentTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  silentBody: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  findBtn: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
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
  postAvatar: {
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
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  fullScreenOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});