import React from 'react';

export default function Review({ review }) {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-start">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${review.avatarColor}`}
        >
          {review.initials}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center">
            <h3 className="font-bold">{review.name}</h3>
            <div className="ml-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fa${i < review.rating ? 's' : 'r'} fa-star text-yellow-500`}
                ></i>
              ))}
            </div>
          </div>
          <p className="text-gray-700 mt-1">{review.text}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span>Đi ngày {review.date}</span>
            {review.purchased && (
              <span className="ml-2 text-green-600 flex items-center">
                <i className="fas fa-check-circle mr-1"></i> Đã mua vé
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
