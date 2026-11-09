import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Pressable, 
  Animated, 
  Dimensions 
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
  User 
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useTheme } from '../theme';

const { width } = Dimensions.get('window');

// --- MOCK DATA FOR THE FEED ---
const STORIES = [
  { id: '1', name: 'Your Story', avatar: 'https://i.pravatar.cc/150?img=1', isAdd: true },
  { id: '2', name: 'alex_v', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'prodx', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'traveler', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'designer', avatar: 'https://i.pravatar.cc/150?img=5' },
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
  { 
    id: '2', 
    user: 'prodx', 
    avatar: 'https://i.pravatar.cc/150?img=3',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
    likes: 856,
    caption: 'New beat dropping soon.',
    time: '5h ago'
  },
];

export default function HomeScreen() {
  const { colors, spacing, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Fade-in animation when the screen loads
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 500, useNativeDriver: true })
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />

      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={[styles.logoText, { color: colors.text }]}>
          INK<Text style={{ color: colors.base }}>.</Text>
        </Text>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <Pressable onPress={() => navigation.navigate('Settings')}>
             <MessageCircle size={26} color={colors.text} strokeWidth={2} />
          </Pressable>
        </View>
      </View>

      <Animated.ScrollView 
        style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY }] }}
        showsVerticalScrollIndicator={false}
      >
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

        {/* FEED POSTS */}
        {POSTS.map((post) => (
          <View key={post.id} style={[styles.postContainer, { borderBottomColor: colors.border }]}>
            
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
                <Text style={{ color: colors.text, fontWeight: '700', fontSize: 14 }}>{post.user}</Text>
              </View>
              <Text style={{ color: colors.textMuted, fontSize: 18 }}>•••</Text>
            </View>

            {/* Post Image */}
            <Image source={{ uri: post.image }} style={styles.postImage} />

            {/* Action Buttons */}
            <View style={styles.actionRow}>
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <Pressable><Heart size={24} color={colors.text} /></Pressable>
                <Pressable><MessageCircle size={24} color={colors.text} /></Pressable>
                <Pressable><Send size={24} color={colors.text} /></Pressable>
              </View>
              <Pressable><Bookmark size={24} color={colors.text} /></Pressable>
            </View>

            {/* Post Details */}
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
        ))}
      </Animated.ScrollView>

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
    height: width, // Square aspect ratio
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
});