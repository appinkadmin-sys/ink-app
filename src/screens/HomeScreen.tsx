import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../theme';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = 0.25 * width;

// --- Types ---
type StudyCard = {
  id: string;
  name: string;
  subject: string;
  image: string;
  bio: string;
};

// --- Mock Data ---
const MOCK_CARDS: StudyCard[] = [
  {
    id: '1',
    name: 'Amara N.',
    subject: 'Calculus & Physics',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=800&auto=format&fit=crop',
    bio: 'Struggling with integration. Let’s match and study.',
  },
  {
    id: '2',
    name: 'Kofi M.',
    subject: 'Politics & History',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    bio: 'Essay season is here. Looking for a study partner.',
  },
  {
    id: '3',
    name: 'Zola T.',
    subject: 'Business & Accounting',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    bio: 'Need help with financial statements. Let’s link.',
  },
];

export default function HomeScreen() {
  const { colors, spacing, radii, typography } = useTheme();
  const [cards, setCards] = useState<StudyCard[]>(MOCK_CARDS);

  // Animated values for the top card
  const position = useRef(new Animated.ValueXY()).current;

  // PanResponder to handle the swipe physics
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction: 'right' | 'left') => {
    const x = direction === 'right' ? width + 100 : -width - 100;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: 'right' | 'left') => {
    if (direction === 'right') {
      console.log('Matched with:', cards[0].name);
      // Later: Save match to Firestore here
    } else {
      console.log('Skipped:', cards[0].name);
    }

    // Remove the top card
    setCards((prev) => prev.slice(1));
    position.setValue({ x: 0, y: 0 });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  // Interpolations for card rotation and opacity
  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const renderCards = () => {
    if (cards.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No more cards</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
            Check back later for more study partners.
          </Text>
        </View>
      );
    }

    return cards
      .map((item, index) => {
        if (index === 0) {
          // The top, swipeable card
          return (
            <Animated.View
              key={item.id}
              {...panResponder.panHandlers}
              style={[
                styles.cardContainer,
                {
                  transform: [
                    { translateX: position.x },
                    { translateY: position.y },
                    { rotate: rotate },
                  ],
                },
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              
              {/* Like/Nope Indicators */}
              <Animated.View style={[styles.likeBadge, { opacity: likeOpacity }]}>
                <Text style={[styles.badgeText, { color: colors.brand, borderColor: colors.brand }]}>STUDY</Text>
              </Animated.View>
              <Animated.View style={[styles.nopeBadge, { opacity: nopeOpacity }]}>
                <Text style={[styles.badgeText, { color: colors.textMuted, borderColor: colors.textMuted }]}>SKIP</Text>
              </Animated.View>

              <View style={styles.cardInfo}>
                <Text style={[styles.cardName, { color: colors.text, fontSize: typography.h2 }]}>
                  {item.name}
                </Text>
                <Text style={[styles.cardSubject, { color: colors.brand, fontSize: typography.bodyLarge, fontWeight: '600' }]}>
                  {item.subject}
                </Text>
                <Text style={[styles.cardBio, { color: colors.textMuted, fontSize: typography.body }]}>
                  {item.bio}
                </Text>
              </View>
            </Animated.View>
          );
        }

        // The cards underneath (stacked)
        return (
          <View
            key={item.id}
            style={[
              styles.cardContainer,
              {
                transform: [{ scale: 1 - index * 0.05 }, { translateY: index * 10 }],
                zIndex: -index,
                opacity: 1 - index * 0.2,
              },
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
          </View>
        );
      })
      .reverse(); // Reverse so the top card renders on top
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.logo, { color: colors.brand, fontSize: typography.h2 }]}>
          Ink.
        </Text>
        <Text style={[styles.subtitle, { color: colors.textMuted, fontSize: typography.body }]}>
          Find a study partner
        </Text>
      </View>

      {/* Card Deck */}
      <View style={styles.deckContainer}>{renderCards()}</View>

      {/* Bottom Action Buttons */}
      {cards.length > 0 && (
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.actionBtn, { borderColor: colors.border, backgroundColor: colors.surface }]}
            onPress={() => forceSwipe('left')}
          >
            <Text style={{ fontSize: 24, color: colors.textMuted }}>✕</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionBtn, { borderColor: colors.brand, backgroundColor: colors.brand }]}
            onPress={() => forceSwipe('right')}
          >
            <Text style={{ fontSize: 24, color: '#FFFFFF' }}>🤍</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  logo: {
    fontWeight: '800',
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: 4,
  },
  deckContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  cardContainer: {
    position: 'absolute',
    width: width * 0.85,
    height: width * 1.3,
    borderRadius: 24,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardName: {
    fontWeight: '700',
  },
  cardSubject: {
    marginTop: 4,
  },
  cardBio: {
    marginTop: 8,
    lineHeight: 20,
  },
  likeBadge: {
    position: 'absolute',
    top: 40,
    left: 30,
    transform: [{ rotate: '-15deg' }],
    zIndex: 10,
  },
  nopeBadge: {
    position: 'absolute',
    top: 40,
    right: 30,
    transform: [{ rotate: '15deg' }],
    zIndex: 10,
  },
  badgeText: {
    fontSize: 32,
    fontWeight: '800',
    borderWidth: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    letterSpacing: 2,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    gap: 30,
  },
  actionBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});