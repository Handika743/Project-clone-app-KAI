import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

//API DATABASE UAS
// const supabase_url = 'https://ivvztxtffgcaihutvnbi.supabase.co';
// const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2dnp0eHRmZmdjYWlodXR2bmJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA1MzM2NzMsImV4cCI6MTk2NjEwOTY3M30.-2gqibw67h1vDcEoypIxNDKdXqmKbXK0fjs9z9j5CtI';

//API DATABASE TB2
const supabase_url = 'https://tcxuqrjzeyqquqlilnne.supabase.co/';
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeHVxcmp6ZXlxcXVxbGlsbm5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU5MTIzMjAsImV4cCI6MTk3MTQ4ODMyMH0.SVjcp5rZyX1TKRjnYCHXfKwyfPvXIbIXMO8dYpS1vrU';

// const supabase_url = 'https://lwljtblxpbfebemalquu.supabase.co/';
// const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3bGp0Ymx4cGJmZWJlbWFscXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM4MzcwMDgsImV4cCI6MTk2OTQxMzAwOH0.Qk1XyMPXqo6-2YuKFC3nq6DdobsnoWa4W0jv79j62ic';

// const supabase_url = 'https://ivvztxtffgcaihutvnbi.supabase.co';
// const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2dnp0eHRmZmdjYWlodXR2bmJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA1MzM2NzMsImV4cCI6MTk2NjEwOTY3M30.-2gqibw67h1vDcEoypIxNDKdXqmKbXK0fjs9z9j5CtI';

// const supabase_url = 'https://cskadbfollpdzdwbyhct.supabase.co';
// const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNza2FkYmZvbGxwZHpkd2J5aGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA1MzM3MzQsImV4cCI6MTk2NjEwOTczNH0.-NeRXG6Dav0ulvHfmdmT0gzck0d-aY82Rv6l2t7kxfM';
const supabase = createClient(supabase_url, supabase_key, {
  localStorage: AsyncStorage,
});

export default supabase;