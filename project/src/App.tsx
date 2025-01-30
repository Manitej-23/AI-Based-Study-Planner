import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Brain, BarChart, Plus, Save } from 'lucide-react';

interface StudySession {
  id: string;
  subject: string;
  duration: number;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

function App() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [newSession, setNewSession] = useState({
    subject: '',
    duration: 30,
    priority: 'Medium' as const,
  });

  const addSession = () => {
    const session: StudySession = {
      id: Math.random().toString(36).substr(2, 9),
      ...newSession,
      completed: false,
    };
    setSessions([...sessions, session]);
    setNewSession({ subject: '', duration: 30, priority: 'Medium' });
  };

  const toggleComplete = (id: string) => {
    setSessions(sessions.map(session =>
      session.id === id ? { ...session, completed: !session.completed } : session
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-indigo-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800">AI Study Planner</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Optimize your learning journey with our intelligent study session planner
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add New Session Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2 text-indigo-600" />
              New Study Session
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={newSession.subject}
                  onChange={(e) => setNewSession({ ...newSession, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter subject name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={newSession.duration}
                  onChange={(e) => setNewSession({ ...newSession, duration: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min="5"
                  step="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={newSession.priority}
                  onChange={(e) => setNewSession({ ...newSession, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <button
                onClick={addSession}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Add Session
              </button>
            </div>
          </div>

          {/* Study Sessions List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
              Study Sessions
            </h2>
            <div className="space-y-4">
              {sessions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No study sessions planned yet. Add your first session!
                </p>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg border ${
                      session.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={session.completed}
                          onChange={() => toggleComplete(session.id)}
                          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <div>
                          <h3 className={`font-medium ${session.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {session.subject}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {session.duration} mins
                            </span>
                            <span className={`text-sm px-2 py-1 rounded-full ${getPriorityColor(session.priority)}`}>
                              {session.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <BarChart className="w-6 h-6 mr-2 text-indigo-600" />
            Progress Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-indigo-900">Total Sessions</h3>
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-indigo-600 mt-2">{sessions.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-green-900">Completed</h3>
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {sessions.filter(s => s.completed).length}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-yellow-900">Pending</h3>
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {sessions.filter(s => !s.completed).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;