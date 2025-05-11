import { redirect } from 'next/navigation';

function Landing() {
  return redirect('/auth/user');
}

export default Landing;
