"use client";
import React, { useState } from "react";
import {
  Send,
  Smile,
  Paperclip,
  Search,
  Hash,
  Users,
  Settings,
  Plus,
  Video,
  MapPin,
  Utensils,
  ChefHat,
  Heart,
  Bookmark,
  X,
  Camera,
  Image,
  User,
} from "lucide-react";
import { channel } from "diagnostics_channel";
import ProtectedRoute from "@/components/ProtectedRoute";

const channels = [
  {
    id: "general",
    name: "General Chat",
    icon: Hash,
    unread: 3,
    members: 1234,
  },
  {
    id: "recipes",
    name: "Recipe Exchange",
    icon: ChefHat,
    unread: 0,
    members: 892,
  },
  {
    id: "restaurants",
    name: "Restaurant Finds",
    icon: Utensils,
    unread: 2,
    members: 567,
  },
  {
    id: "techniques",
    name: "Cooking Techniques",
    icon: Users,
    unread: 0,
    members: 445,
  },
];

const onlineUsers = [
  {
    id: 1,
    name: "Emma Chen",
    avatar: "👩‍🍳",
    status: "online",
    activity: "Sharing recipes",
  },
  {
    id: 2,
    name: "Marco Rossi",
    avatar: "👨‍🍳",
    status: "online",
    activity: "In #general",
  },
  {
    id: 3,
    name: "Aisha Patel",
    avatar: "👩‍🍳",
    status: "online",
    activity: "Cooking live",
  },
  {
    id: 4,
    name: "Luis Santos",
    avatar: "👨‍🍳",
    status: "away",
    activity: "Away",
  },
  {
    id: 5,
    name: "Sophie Laurent",
    avatar: "👩‍🍳",
    status: "online",
    activity: "In #recipes",
  },
  {
    id: 6,
    name: "Kenji Tanaka",
    avatar: "👨‍🍳",
    status: "online",
    activity: "In #recipes",
  },
  {
    id: 7,
    name: "Carlos Rodriguez",
    avatar: "👨‍🍳",
    status: "offline",
    activity: "Last seen 2h ago",
  },
  {
    id: 8,
    name: "Dimitri Papadopoulos",
    avatar: "👨‍🍳",
    status: "online",
    activity: "In #restaurants",
  },
];

const emojis = [
  "😊",
  "😂",
  "❤️",
  "👍",
  "🔥",
  "🎉",
  "😋",
  "🍕",
  "🍜",
  "🌮",
  "🍰",
  "☕",
];

export default function Page() {
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState<any>({
    general: [
      {
        id: 1,
        user: "Emma Chen",
        avatar: "👩‍🍳",
        message:
          "Just made the best carbonara! Anyone tried the recipe from Maria?",
        time: "10:30 AM",
        type: "text",
      },
      {
        id: 2,
        user: "Marco Rossi",
        avatar: "👨‍🍳",
        message:
          "Yes! It turned out amazing. The key is the timing with the eggs.",
        time: "10:32 AM",
        type: "text",
      },
      {
        id: 3,
        user: "Aisha Patel",
        avatar: "👩‍🍳",
        message: "I added some extra pecorino and it was perfect! 🧀",
        time: "10:35 AM",
        type: "text",
      },
      {
        id: 4,
        user: "Luis Santos",
        avatar: "👨‍🍳",
        message: "Check out this dish I made yesterday!",
        time: "10:38 AM",
        type: "image",
        imageUrl:
          "https://www.allrecipes.com/thmb/axhH9DPkfGYBPooMrwmyUqP4sEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/245775-spaghetti-alla-carbonara-the-traditional-italian-recipe-DDMFS-4x3-879c32ee3cfb463582e3e6230e311029.jpg",
      },
      {
        id: 5,
        user: "Emma Chen",
        avatar: "👩‍🍳",
        message: "That looks incredible Luis! What did you use for the sauce?",
        time: "10:40 AM",
        type: "text",
      },
    ],
    recipes: [
      {
        id: 1,
        user: "Sophie Laurent",
        avatar: "👩‍🍳",
        message: "Does anyone have a good sourdough starter recipe?",
        time: "9:15 AM",
        type: "text",
      },
      {
        id: 2,
        user: "Kenji Tanaka",
        avatar: "👨‍🍳",
        message: "I can share mine! Been maintaining it for 3 years now.",
        time: "9:20 AM",
        type: "text",
      },
      {
        id: 3,
        user: "Carlos Rodriguez",
        avatar: "👨‍🍳",
        message: "Kenji, can you share the feeding schedule too?",
        time: "9:25 AM",
        type: "text",
      },
    ],
    restaurants: [
      {
        id: 1,
        user: "Dimitri Papadopoulos",
        avatar: "👨‍🍳",
        message:
          "Found an amazing Greek place downtown! Must try their moussaka.",
        time: "2:00 PM",
        type: "text",
      },
      {
        id: 2,
        user: "Ploy Somchai",
        avatar: "👩‍🍳",
        message: "Share the location! I love Greek food 🇬🇷",
        time: "2:05 PM",
        type: "text",
      },
    ],
    techniques: [
      {
        id: 1,
        user: "Maria Romano",
        avatar: "👩‍🍳",
        message: "Master class on knife skills this Saturday! Who's joining?",
        time: "1:00 PM",
        type: "text",
      },
      {
        id: 2,
        user: "Emma Chen",
        avatar: "👩‍🍳",
        message: "Count me in! I need to improve my julienne cuts.",
        time: "1:15 PM",
        type: "text",
      },
    ],
  });

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages[selectedChannel].length + 1,
        user: "You",
        avatar: "👤",
        message: message,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
      };
      setMessages({
        ...messages,
        [selectedChannel]: [...messages[selectedChannel], newMessage],
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <ProtectedRoute>
      <section className="h-screen flex bg-gray-100">
        {/* Sidebar- Channels  */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💬</span>
              <h1 className="text-xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Community Chat
              </h1>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search channels..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              />
            </div>
          </div>

          {/* Channels List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-gray-500 uppercase">
                  Channels
                </h2>
                <button className="text-gray-400 hover:text-orange-500">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        selectedChannel === channel.id
                          ? "bg-linear-to-r from-orange-50 to-amber-50 text-orange-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="flex-1 text-left font-medium">
                        {channel.name}
                      </span>
                      {channel.unread > 0 && (
                        <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                          {channel.unread}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Online Users */}
            <div className="p-4 border-t border-gray-200">
              <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                Online Now (
                {onlineUsers.filter((u) => u.status === "online").length})
              </h2>
              <div className="space-y-2">
                {onlineUsers.slice(0, 6).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 cursor-pointer transition-all"
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="relative">
                      <span className="text-2xl"> {user.avatar}</span>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          user.status === "online"
                            ? "bg-green-500"
                            : user.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {user.activity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Hash className="w-6 h-6 text-gray-400" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {channels.find((c) => c.id === selectedChannel)?.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {channels.find((c) => c.id === selectedChannel)?.members}
                    members
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Users className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-linear-to-b from-gray-50 to-white">
            {messages[selectedChannel]?.map((msg: any) => (
              <div key={msg.id} className="flex gap-3 group">
                <span className="text-3xl shrink-0">{msg.avatar}</span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {msg.user}
                    </span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  {msg.type === "text" ? (
                    <p className="text-gray-700 leading-relaxed">
                      {msg.message}
                    </p>
                  ) : msg.type === "image" ? (
                    <div>
                      <p className="text-gray-700 leading-relaxed mb-2">
                        {msg.message}
                      </p>
                      <img
                        src={msg.imageUrl}
                        alt="Shared dish"
                        className="max-w-md rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                      />
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" /> 24
                        </button>
                        <button className="flex items-center gap-1 hover:text-orange-500 transition-colors">
                          <Bookmark className="w-4 h-4" /> Save
                        </button>
                      </div>
                    </div>
                  ) : null}
                  {/* Reaction Bar */}
                  <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-lg hover:scale-125 transition-transform">
                      😊
                    </button>
                    <button className="text-lg hover:scale-125 transition-transform">
                      ❤️
                    </button>
                    <button className="text-lg hover:scale-125 transition-transform">
                      👍
                    </button>
                    <button className="text-lg hover:scale-125 transition-transform">
                      😋
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end gap-3">
                <div className="flex-1 bg-gray-100 rounded-xl p-3">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message #${channels
                      .find((c) => c.id === selectedChannel)
                      ?.name.toLowerCase()}`}
                    className="w-full bg-transparent resize-none focus:outline-none text-gray-900 placeholder-gray-500"
                    rows={1}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors relative">
                      <Paperclip className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                      <Image className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                      <Camera className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors relative"
                    >
                      <Smile className="w-5 h-5 text-gray-600" />
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute bottom-20 left-4 bg-white rounded-xl shadow-2xl p-3 border border-gray-200 z-10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700">
                            Quick Emojis
                          </span>
                          <button onClick={() => setShowEmojiPicker(false)}>
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                          {" "}
                          {emojis.map((emoji, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setMessage(message + emoji);
                                setShowEmojiPicker(false);
                              }}
                              className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition-colors"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg font-semibold flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Right Sidebar- User Info (when User is Selected) */}
        {selectedUser && (
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">User Profile</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center mb-6">
              <div className="relative online-block mb-3">
                <span className="text-6xl">{selectedUser.avatar}</span>
                <div
                  className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-white ${
                    selectedUser.status === "online"
                      ? "bg-green-500"
                      : selectedUser.status === "away"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">
                {selectedUser.name}
              </h4>
              <p className="text-sm text-gray-600">{selectedUser.activity}</p>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all font-semibold">
                Send Message
              </button>
              <button className="w-full px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-orange-400 transition-all font-semibold">
                View Profile
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Recent Activity
              </h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <ChefHat className="w-4 h-4 text-orange-500 mt-0.5" />
                  <span>Shared a recipe in #recipes</span>
                </div>

                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-red-500 mt-0.5" />
                  <span>Liked 3 posts today</span>
                </div>

                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span>Member since jan 2024</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </ProtectedRoute>
  );
}
